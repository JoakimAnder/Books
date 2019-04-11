const url = "https://www.forverkliga.se/JavaScript/api/crud.php"

function myJson(response) {
    if(response === undefined)
        throw Error("Response is undefined");
    if(response.status !== 200)
        throw response.statusText;

    return response.json();
}

function checkData(data) {
    if(data === undefined)
        throw Error("Data is undefined");
    if(data.status !== "success") {
        throw Error(data.message);
    }

    return data;
}



function getImgDB() {
    return JSON.parse(localStorage.getItem("myImgDB"))
}

function getKey() {
    return localStorage.getItem("myApiKey")
}

function setKey(key) {
    localStorage.setItem("myApiKey", key)
}

function setImgDB(db) {
    localStorage.setItem("myImgDB", JSON.stringify(db))
}

export default class Dao {
    constructor() {
        if (getKey() === null)
            setKey("")
        if (getImgDB() === null)
            setImgDB({})

        // console.log("key:",getKey())
        // console.log("imgDB:",getImgDB())
    }

    getKey() {
        return getKey()
    }
    
    async newApiKey(tries=10, logErrors=false) {
        return await fetch(url + "?requestKey")
            .then(myJson)
            .then(checkData)
            .then(data => {
                setKey(data.key)
                return data
            })
            .catch(err => {
                if (logErrors) console.error(err)
                return (tries > 0)
                    ?   this.newApiKey(tries-1)
                    :   {
                            status: "failed"
                        }
            })
    }
    
    async add(book, tries=10, logErrors=false) {
        return await fetch(`${url}?op=insert&key=${getKey()}&title=${book.title}&author=${book.author}`)
            .then(myJson)
            .then(checkData)
            .then(data => {
                console.log("Added book: "+data.id);
                return data;
            })
            .then(d => {
                let newImgDB = getImgDB()
                newImgDB[d.id] = book.img
                setImgDB(newImgDB)
                return d
            })
            .catch(err => {
                if (logErrors) console.error(err)
                return (tries > 0)
                    ?   this.add(book, tries-1)
                    :   {
                            status: "failed"
                        }
            })
    }
    
    async get(tries=10, logErrors=false) {
        return await fetch(`${url}?op=select&key=${getKey()}`)
            .then(myJson)
            .then(checkData)
            .then(d => {
                let list = [];
                for (let i in d.data) {
                    list.push({
                        id: d.data[i].id,
                        title: d.data[i].title,
                        author: d.data[i].author,
                        img: getImgDB()[d.data[i].id]
                    });
                }
                return list})
            .then(x => {
                console.log(x)
                return x
            })
            .catch(err => {
                if (logErrors) console.error(err)
                return (tries > 0)
                    ?   this.get(tries-1)
                    :   {
                            status: "failed"
                        }
            })
    }
    
    async edit(book, tries=10, logErrors=false) {
        let key = "key="+getKey()
        let id = "id="+book.id
        let title = "title="+book.title
        let author = "author="+book.author
    
        return await fetch(`${url}?op=update&${key}&${id}&${title}&${author}`)
            .then(myJson)
            .then(checkData)
            .then(d => {
                let newImgDB = getImgDB()
                newImgDB[book.id] = book.img
                setImgDB(newImgDB)
                return d
            })
            .catch(err => {
                if (logErrors) console.error(err)
                return (tries > 0)
                    ?   this.edit(book, tries-1)
                    :   {
                            status: "failed"
                        }
            })
    }
    
    async remove(book, tries=10, logErrors=false) {
        let op = "op=delete"
        let key = "key="+getKey()
        let id = "id="+book.id
    
        return await fetch(`${url}?${op}&${key}&${id}`)
            .then(myJson)
            .then(checkData)
            .then(d => {
                let newImgDB = {}
                for (let id in getImgDB()) {
                    if (id !== String(book.id))
                        newImgDB[id] = getImgDB()[id]
                    else {
                        console.log("Deleted:",id)
                    }
                }
                setImgDB(newImgDB)
                return d
            })
            .catch(err => {
                if (logErrors) console.error(err)
                return (tries > 0)
                    ?   this.remove(book, tries-1)
                    :   {
                            status: "failed"
                        }
            })
    }
}