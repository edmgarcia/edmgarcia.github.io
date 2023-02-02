const form = document.getElementById('form');
const canvas = document.getElementById('canvas');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const thisForm = document.forms.form;
	const formData = new FormData(thisForm);
	const type = Number(formData.get('type'));
	const height = formData.get('height');

	canvas.style.display = "none"; // hides the canvas after lifecycle
	canvas.innerHTML = ""; // removes all children after lifecycle

	drawTriangle(type, height);
});

function drawTriangle(type, height) {
	canvas.style.display = "inline-block"; // show canvas before lifecyle
	const char = "#";
	let space = 0;
	let times = 0;

	switch (type) {
		case 1: // invertedisosceles
			for (let i = height; i > 0; i--) {
				canvas.innerHTML = canvas.innerHTML + "<p>" +char.repeat(i) + '</p>';
			}
			break;
			
		case 2: // rightisosceles
			for (let i = 1; i <= height; i++) {
				canvas.innerHTML = canvas.innerHTML + "<p>" +char.repeat(i) + '</p>';
			}
			break;
			
		case 3: // invertedequilateral
			space = 0

			for (let i = height; i > 0; i--) { // counts from the value of height up to 0
				times = i - 1;

				canvas.innerHTML = canvas.innerHTML + "<p>" + "<span class='spaces'>#</span>".repeat(space++) + char.repeat(Number(i) + times) + "</p>";
			}
			break;
		case 4: // equilateral
			space = height - 1

			for (let i = 0; height > i; i++) { // counts from 1 up to the value of height
				times = i + 1;

				canvas.innerHTML = canvas.innerHTML + "<p>" + "<span class='spaces'>#</span>".repeat(space--) + char.repeat(Number(i) + times) + "</p>";
			}
			break;

		default:
			canvas.innerHTML = canvas.innerHTML + "<h5 class='no-gaps'>Come on dude!<br>The type given is not a known one.</h5>";
			break;
	}
}
// param 1: invertedisosceles, rightisosceles, invertedequilateral, equilateral
// param 2: any number
// drawTriangle('invertedisosceles');
