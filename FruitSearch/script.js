const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");
const fruits = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

function search(str) {
  let results = [];
  let count = 0;
  fruits.forEach(fruit => {
	let lower = fruit.toLowerCase();
	if (lower.includes(str)) {
		if (count === 10) return results;
		count += 1;
		results.push(fruit);
	}
  }); 
  return results;
}

function searchHandler(e) {
  let inputVal = input.value.toLowerCase();
  // console.log(inputVal);
  const results = search(inputVal);
  // console.log(results);
  clearSuggestions(suggestions);
  showSuggestions(results, inputVal);
  if (inputVal == "" || inputVal == null) {
	clearSuggestions(suggestions);
  }
}

function showSuggestions(results, inputVal) {
  results.forEach(result => {
	let suggestion = document.createElement('li');
  	suggestion.innerText = result;
	suggestions.appendChild(suggestion);
  });
}

function useSuggestion(e) {
  // TODO
  // console.log(e.target.innerText);
  let suggestion = e.target.innerText;
  input.value = suggestion;
  clearSuggestions(suggestions);
}

function clearSuggestions(suggestions) {
  while(suggestions.firstChild) {
	suggestions.removeChild(suggestions.firstChild);
  }
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);


