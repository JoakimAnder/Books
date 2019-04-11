import React from "react"

import BookView from "./BookView"
import BookEdit from "./BookEdit"
import BookDelete from "./BookDelete"

export default class BookContainer extends React.Component {
    constructor(props) {
        super()

        this.state = {
            status: "view",
            bookImg: props.book.img,
        }
        this.changeState = this.changeState.bind(this)
    }

    changeState(field, change) { // Function to easily edit one field in state
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

    allowAccess(targetField) { // Function to allow change of state for a single field 
        return change => this.changeState(targetField, () => change)
    }

    render() {
        let bookContainer
        switch(this.state.status) {
            case "view":
                bookContainer = <BookView 
                    book={this.props.book}
                    layout={this.props.layout}
                    changeView={this.allowAccess("status")}
                />
                break
            case "edit":
                bookContainer = <BookEdit 
                    book={this.props.book}
                    bookImg={this.state.bookImg}
                    layout={this.props.layout}
                    edit={this.props.edit}
                    changeImg={this.allowAccess("bookImg")}
                    changeView={this.allowAccess("status")}
                />
                break
            case "delete":
                bookContainer = <BookDelete 
                    book={this.props.book}
                    layout={this.props.layout}
                    delete={this.props.delete}
                    changeView={this.allowAccess("status")}
                />
                break
            default:
                bookContainer = null
        }

        return (
            <div>
                {bookContainer}
            </div>
        )
    }
}