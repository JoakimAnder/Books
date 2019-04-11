import React from "react"

export default function BookDelete(props) {
    return (
        <div className="bookContainer delete">
            <img 
                className="img"
                src={props.book.img}
                onError={e => e.target.style.opacity = 0}
                alt="Book cover"
            />
            <div className="info">
                <button onClick={() => props.changeView("view")} >Cancel</button>
                <button onClick={() => props.delete(props.book)} className="del">Delete</button>
            </div>
        </div>
    )
}
