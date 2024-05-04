import { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios';

const Deck = () => {
    const firstCard = "https://deckofcardsapi.com/static/img/AS.svg";
    const [deckId, setDeckId] = useState();
    const [card, setCard] = useState("https://deckofcardsapi.com/static/img/AS.svg");
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        const getDeck = async () => {
            try {
                const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
                setDeckId(response.data.deck_id);
            } catch (err) {
                console.error('Failed to fetch deck:', err);
            }
        }
        getDeck()
    }, []);

    const shuffleDeck = async () => {
        setIsShuffling(true);
        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            setCard("");
        } catch (err) {
            console.error('No more cards left in deck', err);
        } finally {
            setIsShuffling(false);
        }
    }

    const getCard = async () => {
        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
            setCard(response.data.cards[0].image);
            console.log(response.data.cards[0].image)
        } catch (err) {
            alert("No more cards left in deck");
            console.error('No more cards left in deck', err);
        }
    }


    return <div>
        <Card imageUrl={card}></Card>
        <button onClick={getCard}>Draw 1 Card</button>
        <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
    </div>

}

export default Deck