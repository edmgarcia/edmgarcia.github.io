function startGame() {
	instructionElem.remove();
	
	const id = Math.floor(Math.random() * data.length);

	photo.classList.remove("hidden");
	photo.style.backgroundImage = `url(${data[id]["img"]})`;
	photo.style.backgroundSize = `6000px`;

	generateSelection(id);
}

function generateSelection(id) {
	selection = document.querySelector("#selection");

	for (let i=0; i<data[id]["buttons"].length; i++) {
		selection.innerHTML += `<div class="selection-item">${data[id]["buttons"][i]}</div>`;
	}

	unzoom(data[id]["title"].toLowerCase());
}

function unzoom(answer) {
	let photoSize = 6000;
	let countdown = document.querySelector("#countdown");
	
	countdown.innerText = Number(10);
	
	const unzoomPhoto = setInterval(() => {
		photo.style.backgroundSize = `${photoSize}px`;

		if (photoSize <= 300) {
			checkAnswer(selectedAnswer, answer); // no answer
			clearInterval(unzoomPhoto);
		}

		countdownRemaining = Number(countdown.innerText) === 0 ? 0 : Number(countdown.innerText) - 1;
		photoSize = photoSize - 570;
		countdown.innerText = Number(countdown.innerText) === 0 ? 0 : Number(countdown.innerText) - 1;
	},1000);
}

function checkAnswer(selected, answer) {
	if (selected === answer) {
		// selected is correct
		showPrompt("Good job!", "Winner Winner Chicken Dinner", "Next");

		// add countdownPoint to current score
		you.score = you.score + countdownPoint;
	} else {
		// wrong or no answer
		showPrompt(`Naaah!<br>Answer: <span class="color-yellow text-capitalize">${answer}</span>`, "Better luck next time.", "Home");
	}
}

function showPrompt(header, message, button) {
	const prompt = 	`<div id="instruction" class="text-center game-prompt">
						<div class="instruction-overlay">
							<h1>${header}</h1>
							<p>${message}</p>
							<button id="${button === "Home" ? "home" : "startBtn"}">${button}</button>
						</div>
					</div>`;

	const delayPrompt = setTimeout(() => {
		parentElem.innerHTML += prompt;
		
		document.querySelector("#score").innerText = you.score === 0 ? 0 : you.score;

		clearTimeout(delayPrompt);
	},1300);


	selection.innerHTML = "";
	selectedAnswer = "";
}
