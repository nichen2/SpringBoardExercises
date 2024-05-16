import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DogDetails = ({dogs}) => {
    const navigate = useNavigate();
    const { name } = useParams();
    const dog = dogs.find(d => d.name = name);
    return (
        <div>
            <h2> Name: {dog.name} </h2>
            <h3> Age: {dog.age} </h3>
            <img src={dog.src}></img>
            <ul>
                {dog.facts.map(fact => (
                    <li>
                        <p>{fact}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default DogDetails