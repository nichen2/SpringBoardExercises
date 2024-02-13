/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        this.chains[word] = [nextWord];
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 500) {
   
    let currWord = this.words[Math.floor(Math.random() * this.words.length)];
    let text = [currWord];
  
    for (let i = 1; i < numWords; i++) {
      let nextWords = this.chains[currWord];
      if (!nextWords) { 
        break;
      }
      currWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (currWord === null) { 
        break;
      }
      text.push(currWord); 
    }
    return text.join(' ');
  }
}
module.exports = {MarkovMachine,};

