const Box = ({id, width, height, backgroundColor, removeBox}) => {

    const style = {
        width: width,
        height: height,
        backgroundColor: backgroundColor
    }
    return (    
        <div style={style}>
            <button onClick={() => removeBox(id)}>X</button>
        </div>
    )
}

Box.defaultProps = {
    width: "100px",
    height: "100px",
    backgroundColor: "cyan"
}

export default Box