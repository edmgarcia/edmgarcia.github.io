const prevBtn = document.getElementById("prev_btn");
const nextBtn = document.getElementById("next_btn");
let prevPageCountElem = document.getElementById("prev_page_count");
let nextPageCountElem = document.getElementById("next_page_count");
let prevPageCount = 0;
let nextPageCount = 0;

prevBtn.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	
	if (nextPageCount > 20) {
		showLoading(true);

		const result = fetchPokemonList("remove");

		if (result) {
			document.getElementById(`pokedex_list_${nextPageCount}`).remove(); // removed successfully
			
			showToast("20 Pokemon have been removed.");
			showLoading(false);
			
			nextPageCount -= 20;
		}
	}
});

nextBtn.addEventListener("click", (e) => {
	e.stopImmediatePropagation();

	disableButton(true);

	fetchPokemonList()
	.then(result => {
		if (result) {
			nextPageCount += 20;
		}
	})
});