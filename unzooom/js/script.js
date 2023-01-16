let you = {
	name: "",
	score: 0
}
const parentElem = document.querySelector("#zoomPicCanvas");
let selectionItem = "";
let instructionElem = "";
let photo = "";
let selection = "";
let selectedAnswer = "";
let countdownPoint = "";
let gameStarted = false;
let lives;
let usedId = [];

document.addEventListener("click", e => {
	const thisBtn = e.target;

	if (thisBtn.id.toLowerCase() === "home" || thisBtn.getAttribute("btn-click") === "home") {
		// clears usedId
		usedId = [];
		window.location.replace(baseUrl);
	}
	
	if (thisBtn.id.toLowerCase() === "refresh" || thisBtn.getAttribute("btn-click") === "refresh") {
		window.location.replace(`${baseUrl}?name=${you.name}`);
	}

	if (thisBtn.id === "startBtn") {
		instructionElem = document.querySelector("#instruction");
		photo = document.querySelector("#photo");
		
		if (gameStarted === false) {
			lives = 3;

			document.querySelector("#livesElem").innerHTML = "💚".repeat(lives);
		} else {
			document.querySelector("#livesElem").innerHTML = "💚".repeat(lives);
		}
		
		gameStarted = true;

		startGame(Math.floor(Math.random() * data.length));
	}
	
	if (thisBtn.className === "selection-item") {
		countdownPoint = Number(document.querySelector("#countdown").innerHTML);

		document.querySelector("#score").innerHTML = `${you.score}<span class="countdown-point" title="Potential Point">+${countdownPoint}</span>`;
		selectActive(thisBtn.innerText.toLowerCase());
	}
})

function selectActive(userAnswer) {
	selectionItem = document.querySelectorAll(".selection-item");

	if (!selectedAnswer) {
		for (let i=0; i<selectionItem.length; i++) {
			selectionItem[i].classList.remove("active");
			
			if (selectionItem[i].innerText.toLowerCase() === userAnswer) {
				selectedAnswer = userAnswer.toLowerCase();
				
				selectionItem[i].classList.add("active");
			} else {
				selectionItem[i].classList.add("disabled");
			}
		}
	}
}
