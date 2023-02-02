const fontFamilySelect = document.querySelector("#fontFamily");
const colorSelect = document.querySelector("#color");

const fontStyles = ["monospace", "arial", "cursive", "georgia"]; // fonts
const fontColors = ["white", "royalblue", "coral", "orchid"]; // colors

function appendOptions(parent, child) { // assembles the OPTION for each SELECT element

	for (let i=0; i<child.length; i++) {
		parent.innerHTML += `<option value="${child[i]}" 
								${
									child[i] === "monospace" || 
									child[i] === "white" ? 'selected="selected"' : '' 
								}>
								${child[i]}
							</option>`;
	}
}

appendOptions(fontFamilySelect, fontStyles);
appendOptions(colorSelect, fontColors);