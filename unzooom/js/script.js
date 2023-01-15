const parentElem = document.querySelector("#zoomPicCanvas");
let selectionItem = "";
let instructionElem = "";
let photo = "";
let selection = "";
let selectedAnswer = ""

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
