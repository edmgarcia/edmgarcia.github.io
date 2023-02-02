const timeBg = document.querySelector(".time-bg");
const timeWrapper = document.querySelector(".time-wrapper");
const fontFamilyOptions = document.querySelectorAll("#fontFamily option");
const colorOptions = document.querySelectorAll("#color option");
const bgImgs = ["images/dawn.jpeg", "images/morning.jpeg", "images/afternoon.jpeg", "images/evening.jpeg"];

let bg = "";
let font = "";
let color = "";
let hours24Bool = "";

window.addEventListener("load", () => {
	for (let i=0; i<fontFamilyOptions.length; i++) {
		if (fontFamilyOptions[i].selected) {
			font = fontFamilyOptions[i].value;
		}
	}

	for (let i=0; i<colorOptions.length; i++) {
		if (colorOptions[i].selected) {
			color = colorOptions[i].value;
		}
	}

	hours24Bool = document.querySelector("#hrs24").checked;
})

document.addEventListener("change", e => { // facilitates all change event from DOM
	const value = e.target.value;
	const id = e.target.id.toLowerCase();

	switch(id) {
		case "fontfamily":
		case "color":
			handleTextChange(id, value);
			break;
		case "hrs24":
			handle24Hrs(e.target.checked);
			break;
		default:
			console.error(`ERROR: The function ${id} is undefined.`);
			break;
	}
});

function handleTextChange(id, value) {
	let thisOption = "";

	if (id === "fontfamily") {
		font = value; // updates the font's state (option's value)
		thisOption = fontFamilyOptions;
	}
	
	if (id === "color") {
		color = value; // updates the color's state (option's value)
		thisOption = colorOptions;
	}

	for (let i=0; i<thisOption.length; i++) { 
		thisOption[i].removeAttribute("selected"); // removes selected attribute to all sibling options

		if (thisOption[i].value === value) {
			thisOption[i].setAttribute("selected", "selected"); // adds seletec attribute to the option being selected
		}
	}
}

function handle24Hrs(value) {
	hours24Bool = value; // updates the hour24 states (boolean)
}

function handleBg(hours) {
	if (hours >= 0 && hours <= 5) { // dawn 0 to 5
		bg = bgImgs[0]; // updates bg's state
	}
	if (hours >= 6 && hours <= 11) { // morning 6 to 11
		bg = bgImgs[1]; // updates bg's state
	}
	if (hours >= 12 && hours <= 17) { // afternoon 12pm to 17
		bg = bgImgs[2]; // updates bg's state
	}
	if (hours >= 18 && hours <= 23) { // night 18 to 23
		bg = bgImgs[3]; // updates bg's state
	}
}

setInterval(() => {
	const d = new Date();

	let hrs = d.getHours();
	let mins = d.getMinutes();
	let secs = d.getSeconds();
	
	let hours = "";
	let minutes = "";
	let seconds = "";

	handleBg(hrs);

	if (!hours24Bool && hrs > 12) { // disables military time
		hrs -= 12;
	}

	hours += hrs;
	minutes += mins < 10 ? "0"+mins : mins;
	seconds += secs < 10 ? "0"+secs : secs;

	document.querySelector(".time--hrs").innerHTML = hours;
	document.querySelector(".time--mins").innerHTML = minutes;
	document.querySelector(".time--secs").innerHTML = seconds;
	document.querySelector(".time--ampm").innerHTML = d.getHours() > 11 ? "PM":"AM";

	document.querySelector("#loading").classList.add("hide");

	// fetch the updated states every second
	timeBg.style.backgroundImage = `url(${bg})`;
	timeWrapper.style.fontFamily = font;
	timeWrapper.style.color = color;
	
	timeWrapper.classList.remove("hide");
},1000);