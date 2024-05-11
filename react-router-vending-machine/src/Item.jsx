import React from "react"
import { Link } from "react-router-dom"
const Item = ({name}) => {
    return (
        <div className="item-container">
            <h2>{name}</h2>
            <img src={`src/assets/${name}.jpeg`}></img>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default Item