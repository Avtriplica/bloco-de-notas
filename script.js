const salvarNotaBtn = document.getElementById('salvar-nota');
const listaNotas = document.getElementById('lista-notas');
const notaTexto = document.getElementById('nota-texto');
const notaCor = document.getElementById('nota-cor');
const togglePastaBtn = document.getElementById('toggle-pasta');
const notasContainer = document.querySelector('.notas-container');
const negritoBtn = document.getElementById('negrito');
const italicoBtn = document.getElementById('italico');
const sublinhadoBtn = document.getElementById('sublinhado');

// Função para carregar as notas salvas do localStorage
function carregarNotas() {
    const notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];
    notasSalvas.forEach(nota => criarNota(nota.texto, nota.cor));
}

// Função para salvar uma nova nota no localStorage
function salvarNotasLocalStorage() {
    const notas = [];
    document.querySelectorAll('.nota').forEach(nota => {
        const texto = nota.querySelector('p').innerHTML;
        const cor = nota.style.color;
        notas.push({ texto, cor });
    });
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Função para criar uma nova nota
function criarNota(texto, cor) {
    const nota = document.createElement('div');
    nota.classList.add('nota');
    nota.style.color = cor;

    const tituloNota = document.createElement('h4');
    tituloNota.textContent = 'Nota';

    const conteudoNota = document.createElement('p');
    conteudoNota.innerHTML = texto;
    conteudoNota.contentEditable = "false"; // Desabilita edição direta

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', () => editarNota(nota, conteudoNota, editarBtn));

    const apagarBtn = document.createElement('button');
    apagarBtn.textContent = 'Apagar';
    apagarBtn.addEventListener('click', () => apagarNota(nota));

    const salvarEdicaoBtn = document.createElement('button');
    salvarEdicaoBtn.textContent = 'Salvar';
    salvarEdicaoBtn.style.display = 'none';
    salvarEdicaoBtn.addEventListener('click', () => salvarEdicao(nota, conteudoNota, editarBtn, salvarEdicaoBtn));

    btnContainer.appendChild(editarBtn);
    btnContainer.appendChild(salvarEdicaoBtn);
    btnContainer.appendChild(apagarBtn);

    nota.appendChild(tituloNota);
    nota.appendChild(conteudoNota);
    nota.appendChild(btnContainer);

    listaNotas.appendChild(nota);
    salvarNotasLocalStorage(); // Salva a nota no localStorage após criá-la
}

// Função para editar uma nota
function editarNota(nota, conteudoNota, editarBtn) {
    conteudoNota.contentEditable = "true";
    conteudoNota.focus();
    editarBtn.style.display = 'none';
    nota.querySelector('.btn-container button:nth-child(2)').style.display = 'inline'; // Mostra o botão "Salvar"
}

// Função para salvar a edição da nota
function salvarEdicao(nota, conteudoNota, editarBtn, salvarEdicaoBtn) {
    conteudoNota.contentEditable = "false";
    editarBtn.style.display = 'inline';
    salvarEdicaoBtn.style.display = 'none';
    salvarNotasLocalStorage(); // Atualiza o localStorage após salvar a edição
}

// Função para apagar uma nota
function apagarNota(nota) {
    if (confirm('Você tem certeza que deseja apagar esta nota?')) {
        listaNotas.removeChild(nota);
        salvarNotasLocalStorage(); // Atualiza o localStorage após apagar a nota
    }
}

// Evento ao clicar no botão "Salvar Nota"
salvarNotaBtn.addEventListener('click', () => {
    const texto = notaTexto.innerHTML;
    const cor = notaCor.value;

    if (texto.trim() !== '') {
        criarNota(texto, cor);
        notaTexto.innerHTML = ''; // Limpa o campo de texto após salvar
    } else {
        alert('Por favor, escreva uma nota!');
    }
});

// Evento para abrir e fechar a visualização das notas armazenadas
togglePastaBtn.addEventListener('click', () => {
    if (notasContainer.style.display === 'none' || notasContainer.style.display === '') {
        notasContainer.style.display = 'block';
    } else {
        notasContainer.style.display = 'none';
    }
});

// Funções de formatação
negritoBtn.addEventListener('click', () => {
    document.execCommand('bold');
});

italicoBtn.addEventListener('click', () => {
    document.execCommand('italic');
});

sublinhadoBtn.addEventListener('click', () => {
    document.execCommand('underline');
});

// Atualizar a cor do texto conforme a seleção do seletor de cor
notaCor.addEventListener('input', () => {
    document.execCommand('foreColor', false, notaCor.value);
});

// Definir a cor padrão do texto como branco
notaTexto.style.color = '#ffffff';

// Carregar notas quando a página é aberta
document.addEventListener('DOMContentLoaded', carregarNotas);
