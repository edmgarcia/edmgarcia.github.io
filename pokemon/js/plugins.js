const showToast = (message) => {
	if (message) {
		createToast =	`<div class="toast">
							<div class="toast--inner">
								<h1><i class="fa fa-exclamation-circle"></i></h1>
								<p>${message}</p>
							</div>
						</div>`;

		document.querySelector(".toast-parent").innerHTML += createToast;

		setTimeout(() => {
			if (document.querySelector(".toast")) {
				document.querySelector(".toast").remove();
			}
		},3000);
	}
}

const scrollToNewPokeList = (nextPageCount) => {
	if (nextPageCount > 20) {
		document.getElementById(`pokedex_list_${nextPageCount}`).scrollIntoView();
	}
}

const disableButton = (isDisabled) => {
	if (isDisabled) {
		prevBtn.disabled = true;
		nextBtn.disabled = true;
		showLoading(true);
	} else {
		prevBtn.disabled = false;
		nextBtn.disabled = false;
		showLoading(false);
	}
}

const showLoading = (isShow) => {
	if (isShow) {
		prevPageCountElem.innerHTML = `<img src="images/loading.gif" class="loading" width="20">`;
		nextPageCountElem.innerHTML = `<img src="images/loading.gif" class="loading" width="20">`;
	} else {
		prevPageCountElem.innerHTML = nextPageCount > 20 ? 20:0;
		nextPageCountElem.innerHTML = 20;
	}
}