const pokedexElem = document.getElementById("pokedex");

const makePokeCard = (pokeProfile) => {	
	const pokedexList = document.createElement("div");

	pokeProfile.map(poke => {
		pokedexList.setAttribute("id", `pokedex_list_${nextPageCount}`);
		pokedexList.classList.add("pokedex--list");

		pokedexList.innerHTML +=	`<div class="card" id="${poke.name}">
							<div class="card--pokemon-id"><i class="fa fa-hashtag"></i> ${poke.id}</div>
							<div class="card--inner" style="background-image: url(images/${poke.cardBg});">
								<div class="card--header">
									<div class="header--profile">
										<h1 class="profile--title">${poke.name}</h1>
										<h1 class="profile--title">XP ${poke.expi}</h1>
									</div>
									<div class="header--image-wrapper"><img src="${poke.image}" class="card-image"></div>
								</div>
								<div class="card--main">
									<div class="main--physical align-center">
										<div class="capsule">Height: <b>${poke.height}"</b></div> 
										<div class="capsule">Weight: <b>${poke.weight}</b> lbs</div>
									</div>
									<p class="poke-desc">${poke.desc[3].flavor_text.replace("\f", " ").trim()}</p>
								</div>
								<hr>
								<div class="card--footer">
									<div class="footer--abilities align-center">
										<p class="label">Abilities</p>
										<div class="capsule ${poke.types[0].type.name}"><b>${poke.abilities[0].ability.name}</b></div> 
										${poke.abilities[1] ? `<div class="capsule ${poke.types[0].type.name}"><b>${poke.abilities[1].ability.name}</b></div>`:""}
									</div>
								</div>
							</div>
						</div>`;
	});
	
	pokedexElem.insertAdjacentElement("beforeend", pokedexList);

	scrollToNewPokeList(nextPageCount);
}
