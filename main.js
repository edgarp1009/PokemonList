const API = "https://pokeapi.co/api/v2/pokemon";
const container = document.querySelector(".container");


for (let i = 1; i <= 151; i++) {
    fetch(`${API}/${i}`)
    .then(response => response.json())
    .then(data => crearPokemon(data));
    
}

function crearPokemon(pokemon) {
    let tipos = pokemon.types.map(tipo => `<p class="${tipo.type.name} tipo">${tipo.type.name.toUpperCase()}</p>`);

    tipos = tipos.join('');

    console.log(tipos);

    const div = document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML = `
    <p id="numeroPokemon">#${pokemon.id}</p>
                <figure>
                    <img class="imagen-pokemon" id="foto" src="${pokemon.sprites.other["official-artwork"]["front_default"]}" alt="${pokemon.name}">
                </figure>
                <div class="info-container">
                    <h1 id="nombre">${pokemon.name.toUpperCase()}</h1>
                    ${tipos}
                    <p class="altura info">${(pokemon.height)/10}m</p>
                    <p class="peso info">${(pokemon.weight)/10}Kg</p>
                </div>`;
    container.append(div);

    
}


/* <div class="pokemon card">
                <p id="numeroPokemon">#002</p>
                <figure>
                    <img class="imagen-pokemon" id="foto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" alt="IVYSAUR">
                </figure>
                <div class="info-container">
                    <h1 id="nombre">IVYSAUR</h1>
                    <p class="tipo">GRASS</p>
                    <p class="tipo">POISON</p>
                    <p class="altura">10m</p>
                    <p class="peso">130Kg</p>
                </div>
            </div> */