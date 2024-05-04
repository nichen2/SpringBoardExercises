const Card = ({ imageUrl }) => (
    <div>
        <img src={imageUrl}></img>
    </div>
)

Card.defaultProps = {
    imageUrl: "https://deckofcardsapi.com/static/img/AS.svg"
}

export default Card