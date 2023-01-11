const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; //JSON.parse - transforma a string JSON em dados para o javascript (no caso volta a ser uma array de objetos).

itens.forEach((element) => {
    criaElemento(element);
}) //cria o elemento html independente do 'submit', buscando ele no localStorage (var 'itens'), mantendo o elemento sempre que a pagina atualizar.

form.addEventListener('submit', (event) => {
    event.preventDefault(); //utilizado para cancelar o evento (no caso, evitar que a pagina atualize).

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade']; // armazena em variáveis os valores digitados.

    const itemAtual = { //cria um objeto com as variáveis dos valores digitados.
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    itens.push(itemAtual); //adiciona o objeto à array com os itens do localStorage.

    criaElemento(itemAtual); //cria o elemento html com o objeto criado.

    nome.value = '';
    quantidade.value = ''; //limpa os valores digitados no campo de imput.
})

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem); //utiliza-se o appendChild para incluir a tag, pois tag é considerada um objeto.
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    localStorage.setItem('itens', JSON.stringify(itens)); //JSON.stringfy - transforma valores e objetos em uma string JSON (no caso para armazenar no localStorage, que só aceita strings).
}
