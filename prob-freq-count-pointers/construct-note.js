// add whatever parameters you deem necessary
function constructNote(msg, letters) {
    if (msg === "") return true;
    const msgCounter = new Map();
    const lettersCounter = new Map();
    for (let i = 0; i < letters.length; i++) {
        const char = letters[i];
        if (lettersCounter.get(char)){
            lettersCounter.set(char, lettersCounter.get(char) + 1);
        } else {
            lettersCounter.set(char, 1);
        }
    }
    for (let i = 0; i < msg.length; i++) {
        const char = msg[i];
        if (msgCounter.get(char)){
            msgCounter.set(char, msgCounter.get(char) + 1);
        } else {
            msgCounter.set(char, 1);
        }
    }

    for (const [char, count] of msgCounter) {
        if (!lettersCounter.has(char) || lettersCounter.get(char) < count) {
            return false;
        }
    }
    return true;
}

module.exports = constructNote;