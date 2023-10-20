// ----------- funções -----------
function mostraOpcoesDeTiposPokemons(){
    // a função vai adicionar os tipos
    // de pokemons na página html
    refazONav()

    let dropDown = document.querySelector('.dropDown')
    tiposPokemons.forEach(function(tipoPokemon){
        dropDown.innerHTML += `<p onclick="aparecerNoFiltro(this)">${tipoPokemon}</p>`
    })
}

function refazONav(){
    nav.innerHTML = `
        <p class="tipo" onclick="escondeOpcoesDeTiposPokemons()">tipo <ion-icon name="filter-outline"></ion-icon></p>                 
        <div class="dropDown">
        </div>
    `
}

function escondeOpcoesDeTiposPokemons(){
    document.querySelector('.dropDown').innerHTML = ""
    document.querySelector('.tipo').setAttribute('onclick', 'mostraOpcoesDeTiposPokemons()')
}

function aparecerNoFiltro(elemento){
    escondeOpcoesDeTiposPokemons()
    nav.innerHTML= `
    <p class="tipo" onclick="mostraOpcoesDeTiposPokemons()">${elemento.innerText} <ion-icon name="filter-outline"></ion-icon></p>                 
        <div class="dropDown">
        </div>    
    ` 
    
}

// ----------- código ------------
const tiposPokemons = [
    'Grama',
    'Fogo',
    'Água',
    'Elétrico',
    'Gelo',
    'Lutador',
    'Veneno',
    'Psíquico',
    'Inseto',
    'Rocha',
    'Fantasma',
    'Dragão',
    'Noturno',
    'Aço',
    'Fada',
    'Voador',
    'Terrestre']

const nav = document.querySelector('header nav')