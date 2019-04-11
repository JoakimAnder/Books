import React from "react"

import {inputIsValid} from "./Main"

export default function BookEdit(props) {
    function changeImg(event) {
        let value = event.target.value
        props.changeImg(() => value)
    }

    function changeBook(event) {
        event.preventDefault()
        

        let title = event.target.children[0]
        let author = event.target.children[1]
        let img = event.target.children[2]

        let hasErr = false;
        if (!inputIsValid(title)) {
            hasErr = true;
        }
        if (!inputIsValid(author)) {
            hasErr = true;
        }

        if (!hasErr) {
            props.edit({
                id: props.book.id,
                title: title.value.trim(),
                author: author.value.trim(),
                img: img.value
            })
        
            props.changeView("view")
        }
    }

    return (
        <div>
            <div style={{
                backgroundImage: `url(${props.bookImg})`, 
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}/>
            <form onSubmit={changeBook}>
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
                    onChange={changeImg}
                ></input>
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={() => props.changeView("view")}>Cancel</button>
                </div>
            </form>
        </div>
    )
}