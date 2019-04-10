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



export default class Dao {
    constructor(key="") {
        this.key = key
        this.imgDB = {}
    }
    
    async newApiKey(tries=10, logErrors=false) {
        return await fetch(url + "?requestKey")
            .then(myJson)
            .then(checkData)
            .then(data => {
                this.key = data.key
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
        let operation = "?op=insert"
        let key = "&key="+this.key;
        let title = "&title="+book.title;
        let author = "&author="+book.author;
    
        return await fetch(url + operation + key + title + author)
            .then(myJson)
            .then(checkData)
            .then(data => {
                console.log("Added book: "+data.id);
                return data;
            })
            .then(d => {
                this.imgDB[d.id] = book.img
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
        let op = "?op=select";
        let key = "&key="+this.key;
    
        return await fetch(url+op+key)
            .then(myJson)
            .then(checkData)
            .then(d => {
                let list = [];
                for (let i in d.data) {
                    list.push({
                        id: d.data[i].id,
                        title: d.data[i].title,
                        author: d.data[i].author,
                        img: this.imgDB[d.data[i].id]
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
        let op = "?op=update"
        let key = "&key="+this.key
        let id = "&id="+book.id
        let title = "&title="+book.title
        let author = "&author="+book.author
    
        return await fetch(url+op+key+id+title+author)
            .then(myJson)
            .then(checkData)
            .then(d => {
                this.imgDB[book.id] = book.img
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
        let op = "?op=delete"
        let key = "&key="+this.key
        let id = "&id="+book.id
    
        return await fetch(url+op+key+id)
            .then(myJson)
            .then(checkData)
            .then(d => {
                let newImgDB = {}
                for (let id in this.imgDB) {
                    if (id !== book.id)
                        newImgDB[id] = this.imgDB[id]
                }
                this.imgDB = newImgDB
                return d
            })
            .then(d => {
                console.log("Deleted: "+d.status)
                return d;
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