import React from "react"

export default function Footer(props) {
    return (
        <footer style={props.visible ? {} : {display: "none"}}>
            <div>
                <button onClick={props.requestNewKey}>New key</button>
                <label>{props.apiKey}</label>
            </div>
            <p>
                This is a school project by Joakim Andersson
            </p>
        </footer>
    )
}