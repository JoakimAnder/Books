import React from "react"

export default function Header(props) {
    function change(event, func) {
        let val = event.target.value
        func(() => val)
    }
    function get(event) {
        event.preventDefault()
        props.get()
    }
    return (
        <header 
            style={props.visible ? {} : {display: "none"}}
        >
            <form onSubmit={get} className="search">
                <select onChange={e => change(e, props.changeSearchCat)}>
                    <optgroup label="Search">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="id">Id</option>
                    </optgroup>
                </select>
                <input
                    type={props.searchCat === "id" ? "number" : "text"}
                    placeholder="search"
                    onChange={e => change(e, props.changeSearchTerm)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="sort">
                <select onChange={e => change(e, props.changeSortCat)}>
                    <optgroup label="Sort">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="id">Id</option>
                    </optgroup>
                </select>
                <button onClick={() => props.changeSortAsc(prev => !prev)}>
                    <i className={"fas fa-sort-"+(props.sortAsc?"down":"up")}/>
                </button>
            </div>
            <div className="view">
                <button 
                    value="box"
                    onClick={e => change(e, props.changeLayout)} 
                    className={props.layout === "box" ? "selected" : ""}
                >
                    <i className="fas fa-th-large fa-2x"></i>
                </button>

                <button 
                    value="bar"
                    onClick={e => change(e, props.changeLayout)} 
                    className={props.layout === "bar" ? "selected" : ""}
                >
                    <i className="fas fa-bars fa-2x"></i>
                </button>
            </div>
        </header>
    )
}