const {MarkovMachine} = require('./markov');

describe("MarkovMachine", () => {
  test("constructor splits input text into words", () => {
    const text = "the cat in the hat";
    const mm = new MarkovMachine(text);
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });

  test("makeChains produces a map of word chains", () => {
    const text = "the cat in the hat";
    const mm = new MarkovMachine(text);
    const expectedChains = {
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    };
    expect(mm.chains).toEqual(expectedChains);
  });

  test("makeText generates text of requested length", () => {
    const text = "the cat in the hat";
    const mm = new MarkovMachine(text);
    const generatedText = mm.makeText(10);
    const wordCount = generatedText.split(" ").length;

    // Since the generated text is random, we test for the length of the output
    expect(wordCount).toBeLessThanOrEqual(10);
  });

  test("makeText handles small word lists", () => {
    const text = "the cat";
    const mm = new MarkovMachine(text);
    const generatedText = mm.makeText(5);
    const wordCount = generatedText.split(" ").length;

    // With only two unique words, the generator can still produce output
    expect(wordCount).toBeLessThanOrEqual(5);
  });
});
