const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; //JSON.parse - transforma a string JSON em dados para o javascript (no caso volta a ser uma array de objetos).

itens.forEach((element) => {
    criaElemento(element);
}) //cria o elemento html independente do 'submit', buscando ele no localStorage (var 'itens'), mantendo o elemento sempre que a pagina atualizar.

form.addEventListener('submit', (event) => {
    event.preventDefault(); //utilizado para cancelar o evento (no caso, evitar que a pagina atualize).

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade']; //armazena em variáveis os valores digitados.

    const itemAtual = { //cria um objeto com as variáveis dos valores digitados.
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    const existe = itens.find(element => element.nome === nome.value); //busca na array do localStorage um elemento específico e atribuí ele a uma constante.

    if(existe) { //verifica se o item atual existe no localStorage, se sim, ele mantém o id do item e atualiza o elemento, se não, ele cria o elemento e atribuí um id correspondente ao comprimento da array no localStorage.
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);

        itens[existe.id] = itemAtual; //substituí o item antigo na array pelo novo para que possa ser reescrito para o localStorage.
    } else{
        itemAtual.id = itens.length;

        itens.push(itemAtual); //adiciona o objeto à array com os itens do localStorage.

        criaElemento(itemAtual); //cria o elemento html com o objeto criado.
    }

    localStorage.setItem('itens', JSON.stringify(itens)); //JSON.stringfy - transforma valores e objetos em uma string JSON (no caso para armazenar no localStorage, que só aceita strings).

    nome.value = '';
    quantidade.value = ''; //limpa os valores digitados no campo de imput.
})

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id; //atribuindo à tag strong o id correspondente ao comprimento da array no localStorage.

    novoItem.appendChild(numeroItem); //utiliza-se o appendChild para incluir a tag, pois tag é considerada um objeto.
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector('[data-id = "'+ item.id +'"]').innerText = item.quantidade; //seleciona o data attribute e incluí a nova quantidade no DOM.
}
