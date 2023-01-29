function startGame(id) {

	if (usedId.length === data.length) {
		instructionElem.remove();
		return showPrompt("Uh oh!", `We've ran out of images!<br><br>You're a <b class="color-yellow">Master Unzooom 🐱‍👤.</b>`, "Home");
	}

	if (!usedId.includes(id)) {
		return fetchData(id);
	}

	return startGame(Math.floor(Math.random() * data.length));
}

function fetchData(id) {
	instructionElem.remove();

	// push unique id to usedId
	usedId.push(id);

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
			clearInterval(unzoomPhoto);

			return checkAnswer(selectedAnswer, answer); // no answer
		}
		
		countdownRemaining = Number(countdown.innerText) === 0 ? 0 : Number(countdown.innerText) - 1;
		photoSize = photoSize - 570;
		countdown.innerText = Number(countdown.innerText) === 0 ? 0 : Number(countdown.innerText) - 1;

	},1000);
}

function checkAnswer(selected, answer) {

	if (selected === answer) {
		// selected is correct
		showPrompt("Good job 💪", "Winner Winner Chicken Dinner", "Next");

		// add countdownPoint to current score
		you.score = you.score + countdownPoint;
	} else {

		if (lives <= 1) {
			document.querySelector("#livesElem").innerHTML = "";

			// wrong or no answer
			showPrompt("Naaah 😜", `Answer: <span class="color-yellow text-capitalize">${answer}</span><br><br>No lives left 😭<br><br>Better luck next time.`, "Home");
		} else {
			document.querySelector("#livesElem").innerHTML = "💚".repeat(lives - 1);

			showPrompt("That was close 😏", `Answer: <span class="color-yellow text-capitalize">${answer}</span><br><br>You can do it!<br>You still have ${"💚".repeat(lives - 1)} left.`, "Next");

			lives = lives - 1;
		}
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
		if (you.score >= 100) {
			parentElem.innerHTML += `<div id="instruction" class="text-center game-prompt">
										<div class="instruction-overlay">
											<h1>Awesome eye!</h1>
											<h3>You've reached <b class="color-yellow">100 points.</b></h3>
											<p>You have an eye of a tiger, raaawr!</p>
											<button id="home">Home</button>
										</div>
									</div>`;
		} else {
			parentElem.innerHTML += prompt;
		}
		
		document.querySelector("#score").innerHTML = you.score === 0 ? 0 : you.score;

		clearTimeout(delayPrompt);
	},1300);

	selection.innerHTML = "";
	selectedAnswer = "";
}