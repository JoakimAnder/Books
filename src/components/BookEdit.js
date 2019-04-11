import React from "react"

import {inputIsValid} from "./Main"

export default class BookEdit extends React.Component {
    constructor(props) {
        super()
        this.state = {
            img: props.img,
        }
    }

    changeImg(event) {
        let value = event.target.value
        this.setState(prev => {
            return {img: value}
        })
    }

    changeBook(event) {
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
            this.props.edit({
                id: this.props.book.id,
                title: title.value.trim(),
                author: author.value.trim(),
                img: img.value
            })
        
            this.props.changeView("view")
        }
    }

    componentDidMount() {
        this.setState(prev => {
            return {img: this.props.book.img}
        })
    }

    render() {
        let img = this.state.img ? this.state.img.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG)$/) != null ? this.state.img : "" : ""

        return (
            <div className="bookContainer editable">
                <div 
                    style={{backgroundImage: `url(${img})`}}
                    className="img back"
                />
                <form onSubmit={e => this.changeBook(e)} className="info">
                    <input 
                        type="text"
                        placeholder="Title"
                        required
                        defaultValue={this.props.book.title}
                        ></input>
                    <input 
                        type="text"
                        placeholder="Author"
                        required
                        defaultValue={this.props.book.author}
                        ></input>
                    <input 
                        type="string"
                        placeholder="Cover"
                        defaultValue={this.props.book.img}
                        onChange={e => this.changeImg(e)}
                    ></input>
                    <div>
                        <button type="submit">Submit</button>
                        <button type="reset" onClick={() => this.props.changeView("view")}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}