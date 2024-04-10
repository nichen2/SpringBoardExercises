const Person = ({name='', age=0, hobbies=[]}) => {
    const vote = age >= 18 ? "please go vote!" : "you must be 18";
    const shortName = name.length > 6 ? name.slice(0,6) : name;
    return <div>
        <p>Learn some information about this person</p>
        <h3>{shortName}</h3>
        <h3>{vote}</h3>
        <ul>{hobbies.map(h => <li>{h}</li>)}</ul>
    </div>
}

ReactDOM.render(<Person/>, document.getElementById("root"));