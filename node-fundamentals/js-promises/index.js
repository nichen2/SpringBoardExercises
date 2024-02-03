let baseURL = "http://numbersapi.com/"
/* <number>/trivia?json */

axios
  .get(`${baseURL}24/?json`)
  .then(p1 => {
    console.log(`${p1.data.text}`);
    $("#list").append(`<li> ${p1.data.text} </li>`)
    return axios.get(`${baseURL}25/?json`)
  })
  .then(p2 => {
    console.log(`${p2.data.text}`);
    $("#list").append(`<li> ${p2.data.text} </li>`)
    return axios.get(`${baseURL}27/?json`)
  })
  .then(p3 => {
    console.log(`${p3.data.text}`);
    $("#list").append(`<li> ${p3.data.text} </li>`)
    return axios.get(`${baseURL}27/?json`)
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });

let favNumbers = [24, 25, 27];
$.getJSON(`${baseURL}${favNumbers}?json`).then(data => {
    console.log(data);
});

Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}${24}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("#list2").append(`<li>${data.text}</li>`));
  });
