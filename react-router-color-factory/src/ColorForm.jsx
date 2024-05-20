import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const ColorForm = ( {addColor} ) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor({ name, color });
        navigate('/');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Color Name:</label>
                <input type="text" value={name} onChange ={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Color:</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <button type="submit"> Add Color </button>
        </form>
    )
}

export default ColorForm