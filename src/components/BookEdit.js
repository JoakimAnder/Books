import React from "react"

export default function BookEdit(props) {
    return (
        <div>
            <form onSubmit={(e) => changeBook(e, props)}>
                <input 
                    type="text"
                    placeholder="Title"
                    required
                    defaultValue={props.book.title}
                    ></input>
                <input 
                    type="text"
                    placeholder="Author"
                    required
                    defaultValue={props.book.author}
                    ></input>
                <input 
                    type="text"
                    placeholder="Cover"
                    defaultValue={props.book.img}
                ></input>
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={() => props.changeView("view")}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

function changeBook(event, props) {
    event.preventDefault()

    let title = event.target.children[0]
    let author = event.target.children[1]
    let img = event.target.children[2]

    let hasErr = false;
    if (title.value.trim() === "") {
        hasErr = true;
        title.value = ""
    }
    if (author.value.trim() === "") {
        hasErr = true;
        author.value = ""
    }

    if (hasErr)
        return
    
    props.edit({
        id: props.book.id,
        title: title.value.trim(),
        author: author.value.trim(),
        img: img.value
    })

    props.changeView("view")
}