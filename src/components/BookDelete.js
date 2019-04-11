import React from "react"

export default function BookDelete(props) {
    return (
        <div>
            <img 
                src={props.book.img}
                onError={e => e.target.style.display = "none"}
                alt="Book cover"
            />
            <div>
                <button onClick={() => props.changeView("view")} >Cancel</button>
                <button onClick={() => props.delete(props.book)} >Delete</button>
            </div>
        </div>
    )
}
