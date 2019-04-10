import React from "react"

import BookContainer from "./BookContainer"

export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            addBookImg: "",
        }
        this.changeState = this.changeState.bind(this)
    }

    changeState(field, change) {
        this.setState(prev => {
            let newState = {}
            for (let e in prev) {
            if(e === field) {
                newState[e] = change(prev[e])
            } else
                newState[e] = prev[e]
            }
            return newState
        })
    }

    render() {
        return (
            <main>
                <div>
                    <div></div>
                    <form onSubmit={this.addBook}>
                        <input 
                        placeholder="Title" 
                        required
                        ></input>
                        <input 
                        placeholder="Author" 
                        required
                        ></input>
                        <input 
                        placeholder="Cover" 
                        onChange={onImgInputChange}
                        ></input>
                        <button type="submit">Add Book</button>
                    </form>
                </div>
                {filterAndSort(this.props)}
            </main>
        )
    }

    addBook(event) {
        console.log("TODO: addBook in Main.js")
    }
}

function onImgInputChange(event) {
    console.log("TODO: onImgInputChange in Main.js")
}

function inputIsValid(input) {
    if (input.value.trim() === "") {
        input.value = ""
        input.style.boxShadow = "0 1px 5px rgba(255, 50, 50, 0.8)"
        return false
    } else {
        input.style.boxShadow = "none"
        return true
    }
}

function filterAndSort(props) {
    let bookComponents = filter(props.books, props.searchTerm, props.searchCat)
    bookComponents = sort(bookComponents, props.sortCat, props.sortAsc)
  
    return bookComponents.map(b => 
      <BookContainer 
        layout={props.layout} 
        book={b} 
        key={b.id} 
        delete={props.deleteBook} 
        edit={props.editBook}
        inputIsValid={inputIsValid}
      />)
}
  
  
function filter(list, term, cat) {
    return (term.trim() !== "") 
    // If term isn't empty, filter by term & category
    ? list.filter(b => (cat === "id") 
        ? String(b[cat]).includes(term)
        : b[cat].toLowerCase().includes(term.toLowerCase()))
    // Else copy.
    : list.map(b => b)
}
  
function sort(list, sortBy, asc) {
    switch(sortBy) {
    case "title":
        list = list.sort((x, y) => {
        let xTitle = x.title.trim().toLowerCase()
        xTitle = (xTitle.startsWith("the ")) ? xTitle.substring(4).trim() : xTitle
        let yTitle = y.title.trim().toLowerCase()
        yTitle = (yTitle.startsWith("the ")) ? yTitle.substring(4).trim() : yTitle
        return xTitle.localeCompare(yTitle)
        });
        break;
    case "author":
        list = list.sort((x, y) => {
        let arr = x.author.trimEnd().split(" ")
        let xAuthorSurName = arr[arr.length-1]
        arr = y.author.trimEnd().split(" ")
        let yAuthorSurName = arr[arr.length-1]

        return xAuthorSurName.localeCompare(yAuthorSurName)
        });
        break;
    case "id":
        list = list.sort((x, y) => x.id - y.id);
        break;
    default:
        console.error("Error in App.sort: "+sortBy+" isn't valid.")
    }

    return (asc ? list : list.reverse());
}
/*
function init(addFunc){
addFunc({
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    img: ""//"https://images-na.ssl-images-amazon.com/images/I/5123M2VGGKL.jpg"
})
addFunc({
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG"
})
addFunc({
    title: "Pride and Prejudice",
    author: "Jane Austen",
    img: "https://prodimage.images-bn.com/pimages/9781435160514_p0_v1_s600x595.jpg"
})
addFunc({
    title: "The Book Thief",
    author: "Markus Zusak",
    img: "https://images-na.ssl-images-amazon.com/images/I/91GQpmCxYRL.jpg"
})
addFunc({
    title: "The Fault in Our Stars",
    author: "John Green",
    img: ""//"https://images.gr-assets.com/books/1360206420l/11870085.jpg"
})
}
*/