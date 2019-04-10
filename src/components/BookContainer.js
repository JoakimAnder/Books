import React from "react"

import BookView from "./BookView"
import BookEdit from "./BookEdit"
import BookDelete from "./BookDelete"

export default class BookContainer extends React.Component {
    constructor() {
        super()

        this.state = {
            status: "view"
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

    allowAccess(targetField) {
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
                    layout={this.props.layout}
                    edit={this.props.edit}
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