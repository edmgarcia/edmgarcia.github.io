window.addEventListener("load", () => {
	nextPageCount = nextPageCount+20;
});

const fetchPokemonList = async (param) => {
	if (param === "remove") {
		return true;
	}

	const pokemonNameArray = [];

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${nextPageCount}`);
		const data = await response.json();

		data.results.map(result => pokemonNameArray.push(result.name));
	}
	catch(error) {
		return showToast("ERROR: Fetching Pokemon list.");
	}
	finally {
		if (pokemonNameArray.length) {
			return fetchPokemonInfo(pokemonNameArray);
		}
	}
}

const fetchPokemonInfo = (pokemonNameArray) => {
	Promise.all(pokemonNameArray.map(name => 
		fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then(res => res.json())
	))
	.then(pokemonInfo => {
		const speciesUrlArray = pokemonInfo.map(url => url.species.url);

		Promise.all(speciesUrlArray.map(url =>
			fetch(url)
			.then(res => res.json())
		))
		.then(speciesInfo => {
			disableButton(false);
			showToast("SUCCESS: 20 Pokemon have been added.");

			assemblePokemonData(pokemonInfo, speciesInfo);
		})
		.catch(error => showToast(`ERROR: ${error}`))
	})
	.catch(error => showToast(`ERROR: ${error}`))

	return true;
}

const assemblePokemonData = (pokemonInfo, speciesInfo) => {
	const cardBgArray = {grass: "grass.jpg", ice: "ice.jpg", poison: "poison.jpg", ground: "ground.jpg", electric: "electric.jpg", water: "water.jpg", fire: "fire.jpg", bug: "bug.jpg", default: "default.jpg"}
	
	const pokeProfile = [];
	
	for (let i = 0; i < pokemonInfo.length; i++) {
		const bg = cardBgArray[pokemonInfo[i].types[0].type.name.toLowerCase().trim()];

		for (let j = 0; j < speciesInfo.length; j++) {

			// assembles ONLY the pokemon details needed
			pokeProfile[i] = {
				"abilities": [ability] = pokemonInfo[i].abilities,
				"desc": [entries] = speciesInfo[i].flavor_text_entries,
				"cardBg": bg ? bg:cardBgArray["default"],
				"expi": pokemonInfo[i].base_experience,
				"height": pokemonInfo[i].height,
				"image": pokemonInfo[i].sprites.front_default,
				"moves": [moves] = pokemonInfo[i].moves,
				"name": pokemonInfo[i].name,
				"types": [types] = pokemonInfo[i].types,
				"weight": pokemonInfo[i].weight,
			}
		}
	}

	makePokeCard(pokeProfile);
}

fetchPokemonList();