import React from "react"

export default function BookDelete(props) {
    return (
        <div>
            <button onClick={() => props.changeView("view")} >Cancel</button>
            <button onClick={() => remove(props)} >Delete</button>
        </div>
    )
}

function remove(props) {
    // console.log("deleting:",props.book);
    
    props.delete(props.book)
    // props.changeView("view")
}