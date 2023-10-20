// ----------- variaveis ----------//
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

const tipos = document.querySelector('.tipos')

const elementoSelecionado = document.querySelector('.elementoSelecionado')

// ----------- funções ------------//
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
// -------- código principal ------//
 criarNavBar()