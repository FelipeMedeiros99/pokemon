// ----------- variaveis ----------//
const tiposPokemons = [
    "Fogo", "Água", "Grama", "Elétrico", "Terra", "Voador", "Gelo", "Pedra", "Aço", "Normal", "Lutador", "Fantasma", "Sombrio", "Venenoso", "Dragão", "Fada", "Inseto", "Psíquico"
]

const tiposPokemonsIngles = ["Fire", "Water", "Grass", "Electric", "Ground", "Flying", "Ice", "Rock", "Steel", "Normal", "Fighting", "Ghost", "Dark", "Poison", "Dragon", "Fairy", "Bug", "Psychic"]


const tipos = document.querySelector('.tipos')

const elementoSelecionado = document.querySelector('.elementoSelecionado')

let article = document.querySelector('article')

// site geral dos pokemons
let siteGeral = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=100"
let listaLinksDosPokemons = []

// ----------- funções ------------//

// funções da barra de navegação
function criarNavBar(){
    // cria a barra de navegação com as opções de tipos
    let listaDePokemonsEmHTML = tiposPokemons.map(transformarEmHTML)

    // adicionando os tipos ao html
    listaDePokemonsEmHTML.forEach(function(elemento){
        tipos.innerHTML += elemento
    })
}

function transformarEmHTML(elemento){
    return `
    <p onclick=selecionaOpcao(this)>
        ${elemento}
    </p>`
}

function mostrarOcultarTipos(){
    // ativado ao passar o mouse sobre os tipos
    // faz parte do filtro
    tipos.classList.toggle('ativado')

}

function selecionaOpcao(elemento){
    elementoSelecionado.innerHTML = `
    ${elemento.innerText} <ion-icon name="chevron-down-outline"></ion-icon>
    `
    mostrarOcultarTipos()

}

//  funções da API
function mostraDadosDaAPI(dados){
    console.log('deu certo')
    console.log(dados.data)
}

function mostraErroDaAPI(erro){
    console.log('deu erro')
    console.log(erro)
}

function criaPagina(dados){
    // salvando os links da api 
    dados.data.results.forEach(function(link){listaLinksDosPokemons.push(link['url'])})

    // gerando as imagens no html
    listaLinksDosPokemons.forEach(gerarImagens)
    
}

function gerarImagens(link){
    let dadosPokemon = axios.get(link)
    // dadosPokemon.then(mostraDadosDaAPI)
    dadosPokemon.then(plotarPokemon)
    dadosPokemon.catch(mostraErroDaAPI)
}

function plotarPokemon(dado){
    console.log(dado.data['types']['0'])
    // console.log(dado.data['sprites']['other']['dream_world'])
    article.innerHTML += `
    <div class="caixaPokemon">
        <img src="${dado.data['sprites']['other']['dream_world']['front_default']}">
        <p class="nome">${dado.data['name']}</p>
        <p class="tipo">tipo: ${traduzir(dado.data['types']['0']['type']['name'])}</p>
    </div>
    `
}

function traduzir(palavra){
    
    for (let i = 0; i < tiposPokemons.length; i++){
        console.log(primeiraLetraMaiuscula(palavra))
        if (primeiraLetraMaiuscula(palavra) === tiposPokemonsIngles[i]){
            return tiposPokemons[i]
        }
    }  
}

function primeiraLetraMaiuscula(palavra){
    let letras = []
    for (let i = 0; i< palavra.length; i ++){
    letras.push(palavra[i])
    }

    letras[0] = `${letras[0]}`.toUpperCase()
    return letras.join('')
}

// -------- código principal ------//

// criando as opções da barra de tipos
criarNavBar()

//  testando a API
let promessa = axios.get(siteGeral)
promessa.then(criaPagina)
promessa.catch(mostraErroDaAPI)

