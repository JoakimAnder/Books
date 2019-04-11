import React from "react"

export default class BookView extends React.Component {
    constructor() {
        super()
        this.state = {
            hovering: false,
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
        // For safety, got an error b4
        this.props.book.img = (this.props.book.img === undefined) ? "" : this.props.book.img;
        

        return (
            <div>
                <img 
                    src={this.props.book.img} 
                    alt="Book Cover"
                ></img>
                <div>
                    <h3>{this.props.book.title}</h3>
                    <p>by</p>
                    <h4>{this.props.book.author}</h4>
                    <div>
                        <button onClick={() => this.props.changeView("edit")} ><i className="fas fa-edit fa-2x"></i></button>
                        <button onClick={() => this.props.changeView("delete")} ><i className="fas fa-trash fa-2x"></i></button>
                    </div>
                </div>
            </div>
        )
    }

}