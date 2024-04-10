const API = "https://pokeapi.co/api/v2/pokemon";
const container = document.querySelector(".container");

// Utilice Async/await porque los pokemon se estaban generando de manera desordenada
let firstPokemonMain = 1;
let lastPokemonMain = 151;

async function obtenerPokemon(first, last) { 
    for (let i = first; i <= last; i++) {
    try{
        const response = await fetch(`${API}/${i}`);
        const data = await response.json();
        crearPokemon(data);
    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
    }
        
    }
};

// for (let i = 1; i <= 151; i++) {
//     fetch(`${API}/${i}`)
//     .then(response => response.json())
//     .then(data => crearPokemon(data));
    
// }

function crearPokemon(pokemon) {
    //Generamos los elementos <p> con los tipos correspondientes a cada pokemon
    let tipos = pokemon.types.map(tipo => `<p class="${tipo.type.name} tipo">${tipo.type.name.toUpperCase()}</p>`);

    tipos = tipos.join('');


    //Generamos las cards de cada pokemon y le agregamos una clase Flipped para voltear la card
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.addEventListener("click", () => divCard.classList.toggle("flipped"));

    const divFront = document.createElement("div");
    divFront.classList.add("front")
    divFront.innerHTML = `
                <p id="numeroPokemon">#${pokemon.id}</p>
                <figure>
                    <img class="imagen-pokemon lazy" id="foto" data-src="${pokemon.sprites.other["official-artwork"]["front_default"]}" alt="${pokemon.name}">
                </figure>
                <div class="info-container">
                    <h1 id="nombre">${pokemon.name.toUpperCase()}</h1>
                    ${tipos}
                    <p class="altura info">${(pokemon.height)/10}m</p>
                    <p class="peso info">${(pokemon.weight)/10}Kg</p>
                </div>`;
    
    const divBack = document.createElement("div");
    divBack.classList.add("back");
    divBack.innerHTML = `
    <h1>${pokemon.name.toUpperCase()}</h1>
    <p class="shinny">VERSION SHINY</p><img class="imagen-back lazy" data-src="${pokemon.sprites.other["official-artwork"]["front_shiny"]}" alt="">`;

    container.append(divCard);
    divCard.append(divFront, divBack);

    //Listeners para LazyLoad
    window.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    lazyLoad();
}

//Colocamos un event listener a cada boton de la navbar para crear un filtro de pokemon dependiendo de su clase

const navbarTypes = document.querySelectorAll(".navbar-type");

navbarTypes.forEach(navbarType => navbarType.addEventListener("click",() => {
    
    for (let i = 0; i < container.children.length; i++) {

        const cardInfo = container.children[i].children[0].children[2].children;
        const cardInfoArray = Array.from(cardInfo);

        if (navbarType.classList.contains("todos")){
            container.children[i].classList.remove("hidden");
        } 
        else if (!cardInfoArray.some(item => item.classList.contains(`${navbarType.classList[1]}`))){
            container.children[i].classList.add("hidden");
        } 
        else {
            container.children[i].classList.remove("hidden");
        }
        
    }
} ))

//Creando un buscador de pokemon mediante un input

const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", () => {
    for (let i = 0; i < container.children.length; i++) {
        const valorBuscador = buscador.value.toLowerCase();

        const pokemonName = container.children[i].children[0].children[2].children[0].textContent;
        // const cardInfoArray = Array.from(cardInfo);

        if (!pokemonName.toLowerCase().includes(`${valorBuscador}`)){
            container.children[i].classList.add("hidden");
            console.log("no tiene");
        } 
        else {
            container.children[i].classList.remove("hidden");
            console.log("tiene");
        }
        
    }
});

//Funcion de LazyLoad

function lazyLoad() {
    const lazyImages = document.querySelectorAll(".lazy");

    lazyImages.forEach(image => {
        if (image.getBoundingClientRect().top < window.innerHeight && image.getBoundingClientRect().bottom >= 0 && getComputedStyle(image).display !== "none") {
            image.src = image.dataset.src;
            image.classList.remove("lazy");

            console.log("Lazy")
        }
    });
}

obtenerPokemon(firstPokemonMain, lastPokemonMain);