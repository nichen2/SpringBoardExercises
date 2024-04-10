const NamedComponent = (props) => (
    <p>My name is {props.name}</p>
)

ReactDOM.render(<NamedComponent name="Mike"/>, document.getElementById("root"));