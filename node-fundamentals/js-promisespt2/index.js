let baseURL = "https://deckofcardsapi.com/api/deck"

let deckId;
axios
  .get(`${baseURL}/new/draw`)
  .then(p1 => {
    console.log(`${p1.data.cards[0].value}`);
    console.log(`${p1.data.cards[0].suit}`);
    deckId = p1.data.deck_id
    $("#card").attr("src",`${p1.data.cards[0].image}`)
    return axios.get(`${baseURL}/${deckId}/draw`)
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });

$("#draw").on("click",() => {
    axios.get(`${baseURL}/${deckId}/draw`)
    .then(p1 => {
        console.log(`${p1.data.cards[0].value}`);
        console.log(`${p1.data.cards[0].suit}`);
        $("#card").attr("src",`${p1.data.cards[0].image}`)
    })
})

