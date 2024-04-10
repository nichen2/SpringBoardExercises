const App = () => (
    <div>
        <Person name="Marth" age={18} hobbies={["Sword","Eating","Piercing"]}/>
        <Person name="Lucinafer" age={17} hobbies={["Sword","Eating","Piercing"]}/>
        <Person name="Bowser" age={356} hobbies={["Stomping","Gromping","Jumping"]}/>
    </div>
)

ReactDOM.render(<App/>,
  document.getElementById("root"));
