// const Tweet = (prop) => (
//     <div className="Tweet">
//         <h2>
//             {prop.name} posted:
//         </h2>
//         <p>{prop.message}</p>
//         <h4> {prop.username} {prop.date}</h4>
//     </div>
// )

const Tweet = ({ name, message, username, date }) => (
    <div className="tweet">
      <div className="tweet-header">
        <img src="path/to/avatar.png" alt="User Avatar" className="avatar"/>
        <div className="user-info">
          <h2>{name}</h2>
          <h4>@{username}</h4>
        </div>
        <span className="date">{date}</span>
      </div>
      <p className="message">{message}</p>
    </div>
  );
  