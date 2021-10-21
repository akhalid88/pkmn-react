export async function getAllPokemon(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				resolve(data);
			})
	})
}

export async function getPokemon(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				resolve(data);
			})
	})
}

//for search functionailty/ clickin on specific pokemon card
export async function getSpecificPokemon(url) {

}

//for getting list of pokemon types
export async function getAllTypes(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				resolve(data);
			})
	})
}

//for filtering pokemon by type
export async function getPokemonByType(url) {

}