let baseURL = "https://deckofcardsapi.com/api/deck"

const deck = {
  async init() {
    let res = await axios.get(`${baseURL}/new/`)
    this.deckId = res.data.deck_id;
    this.shuffle();
  },
  async shuffle(){
    let res = await axios.get(`${baseURL}/${this.deckId}/shuffle/`)
    console.log(res);
  },
  async drawCard() {
    let res = await axios.get(`${baseURL}/${this.deckId}/draw/?count=1`)
    $("#card").attr("src",`${res.data.cards[0].image}`);
  }
}

deck.init();

$("#draw").on("click",() => {
  deck.drawCard();
})