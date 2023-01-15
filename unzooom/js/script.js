const parentElem = document.querySelector("#zoomPicCanvas");
let selectionItem = "";
let instructionElem = "";
let photo = "";
let selection = "";
let selectedAnswer = "";
let countdownPoint = "";

document.addEventListener("click", e => {
	const thisBtn = e.target;

	if (thisBtn.id.toLowerCase() === "home") {
		window.location.replace(baseUrl);
	}

	if (thisBtn.id === "startBtn") {
		instructionElem = document.querySelector("#instruction");
		photo = document.querySelector("#photo");
		startGame();
	}

	if (thisBtn.className === "selection-item") {
		countdownPoint = Number(document.querySelector("#countdown").innerHTML);
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
