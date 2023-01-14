const avatars = ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg", "avatar4.jpg", "avatar5.jpg", "avatar6.jpg",];

window.addEventListener("load", () => {
	
	if (document.querySelector("#ui_1")) {
		const ui_1 = document.querySelector("#ui_1");
		let count = 1;
	
		const slider = setInterval(() => {
			if (count === 10000) {
				clearInterval(slider);
			}
			ui_1.style.backgroundPosition = `${count}px`;
			count++;
		},70);
	}

	if (document.querySelector("#ui_2")) {
		const random = Math.ceil(Math.random()*5);

		document.querySelector("#profileAvatar").style.backgroundImage = `url(images/${avatars[random]})`;
	}

	if (document.querySelector("#restart")) {
		document.querySelector("#restart").addEventListener("click", () => {
			window.location.replace(baseUrl)
		})
	}
})
