/*
Begin
	store vowel letters in vowels[]

	FUNCTION distanceToNearestVowel accepts a parameter (phrase)
		IF phrase has spaces with regex (/\s/g)
			REPLACE spaces and toLowerCase then store in str
		ELSE
			toLowerCase then store in str

		FOR each letters
			IF each str is a vowel
				PUSH index to vIndex[]

		call valueOfNearest

	FUNCTION valueOfNearest accepts vIndex[] and index
		RETURN the calculation of index using Math class and its methods
End	
*/

const resultElem = document.querySelector("#result");
const phrase = document.getElementsByName("phrase");
const table = document.querySelector("table");
const trPhrase = document.getElementById("tr_phrase");
const trCount = document.getElementById("tr_count");

document.querySelector("#phrase_form").addEventListener("submit", (e) => {
	e.preventDefault();

	table.classList.add("hidden"); // hides table on start lifecycle
	trPhrase.innerHTML = ""; // empties tr
	trCount.innerHTML = ""; // empties tr

	distanceToNearestVowel(phrase[0].value.toLowerCase());
})

function distanceToNearestVowel(phrase) {
	const checkSpaces = /\s/g; // regEx for spaces
	let str = "";
	let vIndex = [];
	let counts = "";

	if (checkSpaces.test(phrase)) { // checks for spaces
		str = phrase.replace(checkSpaces, ""); // remove spaces and store continues string to str
	} else {
		str = phrase;
	}

	for (let i=0; i<str.length; i++) { // loop thru each letter of str
		if (str[i] === "a" || str[i] === "e" || str[i] === "i" || str[i] === "o" || str[i] === "u") { // checks str for any vowels
			vIndex.push(i); // push vowel's index to vIndex
		}

		trPhrase.innerHTML = trPhrase.innerHTML + `<td>${str[i]}</td>`; // appends each letter to trPhase elem
	}

	counts = str.split("").map((elem, index) => valueOfNearest(vIndex, index)); // gets the count between vowel and consonants, store to counts
	
	for (let count of counts) { // loop thru counts
		if (count === 0) { // finds 0 (vowel)
			trCount.innerHTML = trCount.innerHTML + `<td><b>${count}</b></td>`; // appends each count to trCount elem
		} else {
			trCount.innerHTML = trCount.innerHTML + `<td>${count}</td>`; // appends each count to trCount elem
		}
	}

	table.classList.remove("hidden"); // shows table per lifecycle
}

function valueOfNearest(vIndex, index) {
	return vIndex.reduce((a, b) => Math.min(a, Math.abs(b - index)), Infinity); // gets consonant's index and substract it to the vowel's
}