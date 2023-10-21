// ----------- variaveis ----------//
const tiposPokemons = ["--", "Fogo", "Água", "Grama", "Elétrico", "Terra", "Voador", "Gelo", "Pedra", "Aço", "Normal", "Lutador", "Fantasma", "Sombrio", "Venenoso", "Dragão", "Fada", "Inseto", "Psíquico"]
const tiposPokemonsIngles = ["--types--", "Fire", "Water", "Grass", "Electric", "Ground", "Flying", "Ice", "Rock", "Steel", "Normal", "Fighting", "Ghost", "Dark", "Poison", "Dragon", "Fairy", "Bug", "Psychic"]

const tipos = document.querySelector('.tipos')
const elementoSelecionado = document.querySelector('.elementoSelecionado')
let article = document.querySelector('article')
let siteGeral = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
let listaLinksDosPokemons = []
let listaLinksDosPokemonsFiltrados = []

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
    ${elemento.innerText} <ion-icon name="chevron-down-outline"></ion-icon>`
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
    // console.log(dado.data['types']['0'])
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
        // console.log(primeiraLetraMaiuscula(palavra))
        if (primeiraLetraMaiuscula(palavra) === tiposPokemonsIngles[i]){
            return tiposPokemons[i]
        }
    }  
}

function destraduzir(palavra){
    for (let i = 0; i < tiposPokemons.length; i++){
        // console.log(primeiraLetraMaiuscula(palavra))
        if (primeiraLetraMaiuscula(palavra) === tiposPokemonsIngles[i]){
            return tiposPokemonsIngles[i]
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

function mostrarPokemonNaPagina(){
    let promessa = axios.get(siteGeral)
    promessa.then(criaPagina)
    promessa.catch(mostraErroDaAPI)

}

// funções para alterar a quantidade de pokemons exibida
function alteraLinkDeExibicao(){
    let numPokemons = document.querySelector('.qtDePokemonsParaExibir input').value
    // console.log(numPokemons)
    siteGeral = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${numPokemons}`
    listaLinksDosPokemons = []
    document.querySelector('article').innerHTML = ''
    mostrarPokemonNaPagina()    
}

// filltrando tipos
function filtrarTipo(){
    // desolcultando tudo:
    let itensOcultos = document.querySelectorAll('.ocultar')
    itensOcultos.forEach(function(elemento){elemento.classList.remove('ocultar')})


    let tipoParaFiltrar= document.querySelector(".elementoSelecionado").innerText
    let tiposDosPokemonsdaTela = document.querySelectorAll('.caixaPokemon')
    
    if (tipoParaFiltrar === "--"){
    }else{
        for (let i = 0; i < tiposDosPokemonsdaTela.length; i++){       
            let tipoDoPokemon = tiposDosPokemonsdaTela[i].querySelector('.tipo').innerText 
            if (tipoDoPokemon !== `tipo: ${tipoParaFiltrar}`){
                tiposDosPokemonsdaTela[i].classList.add('ocultar')
            }
        }
    }
}



// -------- código principal ------//

// criando as opções da barra de tipos
criarNavBar()

//  testando a API
mostrarPokemonNaPagina()

