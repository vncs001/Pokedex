// Variaveis instanciadas----------------------------------------------------------------------------
let pokemons = []//array de pokemons
let pokemonPromises = []//array com as promisses para buscar pokemons
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`//caminho dos pokemons
const ul = document.querySelector('[data-js="pokedex"]')// escrever pokes no html com uma ul


// Função de mostrar todos os pokemons---------------------------------------------------------------
listAll() 
// Mapeando as informações dos pokemons para cada card e padronizando a maneira de pegar cada--------
const mapPokemon = (results) => {
    return results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map(type => type.type.name).join(" | "),
    }));
}
// DESENHANDO POKEMONSSSS----------------------------------------------------------------------------

const drawPokemon = (pokemon) => {
    pokeHtml = `
            <li class="card ${pokemon.type}">
            <img class="card-image" alt="${pokemon.name}" src="${pokemon.image}"/>
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${pokemon.type}</p>
            <button id="mod">Abrir modal</button>

                <dialog id="dialog">
                <img class="card-image" alt="${pokemon.name}" src="${pokemon.image}"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${pokemon.type}</p>
                </dialog>
            </li>
            `
        ul.innerHTML += pokeHtml
}
//Escolhendo pokemons---------------------------------------------------------------------------
    const btn = document.querySelector("#bnt")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        //limpa pokemons
        ul.innerHTML = ``
        //pega o nome do pokemon
        const poke = document.querySelector("#pesq")
        const pesquisa = poke.value
        console.log(pesquisa)
        let resul = pokemons.filter(pokemon => pokemon.name == pesquisa)
        //  pokemonPromises.push(fetch(getPokemonUrl(pokemon.resul))
        //  .then(response => response.json()))
        console.log(resul)
        resul.forEach(resul => {
            drawPokemon(resul)
        })
    })


function listAll() {
    for (i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i))
            .then(response => response.json()))
    }
    // Pegando a promise de pokemons e desenhando um por um--------------------------------------------
    Promise.all(pokemonPromises).then(results => {
        pokemons = mapPokemon(results)
        pokemons.forEach(pokemon => {
            drawPokemon(pokemon)
        })
    })
}
//-----------------------------------------------------------------------------------------------
// const btmod = document.querySelector("#mod")
// const modal = document.querySelector("#dialog")
// btmod.onclick = function(){
//     console.log('MODAL')
//     modal.showModal()  
// }