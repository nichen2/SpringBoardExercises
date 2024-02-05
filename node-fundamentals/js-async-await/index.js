let baseURL = "http://numbersapi.com/"
/* <number>/trivia?json */


async function getNumber(number) {
  p1 = await axios.get(`${baseURL}${number}/?json`);
  console.log(`${p1.data.text}`);
  $("#list").append(`<li> ${p1.data.text} </li>`)
}


let favNumbers = [24, 25, 27];
async function getNumbers(favNumbers) {
  await $.getJSON(`${baseURL}${favNumbers}?json`).then(data => {
    console.log(data);
  });
}
async function getAll() {
  await Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}${24}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("#list2").append(`<li>${data.text}</li>`));
  });
}

getNumber(24);
getNumbers(favNumbers)
getAll();
