const App = () => (
    <div>
        <Tweet username="username1" name="user1" date="4/10/2024" message="I like spaghettios"/>
        <Tweet username="username2" name="user2" date="4/5/2024" message="I like cherrios"/>
        <Tweet username="username3" name="user3" date="4/7/2024" message="I like frosted flakes"/>
        <Tweet username="username4" name="user4" date="4/8/2024" message="I am an AI"/>
    </div>
)

ReactDOM.render(<App/>,
  document.getElementById("root"));
