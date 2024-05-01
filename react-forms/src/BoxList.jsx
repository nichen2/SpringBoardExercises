import React, {useState} from 'react'
import NewBoxForm from "./NewBoxForm"
import Box from "./Box"

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    
    const addBox = (newBox) => {
        const {width, height, backgroundColor} = newBox;
        setBoxes(boxes => [...boxes, {...newBox, id: `${width}-${height}-${backgroundColor}`}])
    }

    const removeBox = (id) => {
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }
    return (
        <>
            <ul>
                {boxes.map(box => (
                    <li key={box.id}>
                        <Box id={box.id} width={box.width} height={box.height} backgroundColor={box.backgroundColor} removeBox={removeBox}/>
                    </li>
                ))}
            </ul>
            <NewBoxForm addBox={addBox}></NewBoxForm>
        </>
    )
}

export default BoxList