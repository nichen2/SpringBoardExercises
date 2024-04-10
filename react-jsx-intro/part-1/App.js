const App = () => (
    <div>
        <First />
        <NamedComponent name="Jello"/>
    </div>
)

ReactDOM.render(<App/>,
  document.getElementById("root"));
