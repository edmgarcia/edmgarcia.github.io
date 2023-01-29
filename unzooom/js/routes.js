const baseUrl = `https://edmgarcia.github.io/unzooom/`;
let urlObj = new URL(window.location.href);
let youName = urlObj.searchParams.get("name");

window.addEventListener("load", () => {
	if (youName) {
		you.name = youName.charAt(0).toUpperCase() + youName.slice(1);
		document.querySelector("#ui_1").remove();
		
		document.querySelector("#ui_2").classList.remove("hidden");

		document.querySelector("#youName").innerText = you.name;
	} else {
		document.querySelector("#ui_1").classList.remove("hidden");
	}
})

document.querySelector("#yourNameform").addEventListener("submit", e => {
	e.preventDefault();
	
	let yourNameInput = document.querySelector("#yourNameInput").value;
	
	if (yourNameInput) {
		window.location.replace(`${urlObj}?name=${yourNameInput}`);
	}
})
