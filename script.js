// ── Início das alterações ──

// Gera um ID único (timestamp + aleatório)
function gerarWidgetUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Tenta ler o ID de utilizador do localStorage
let widgetUserId = localStorage.getItem('widgetUserId');
if (!widgetUserId) {
    widgetUserId = gerarWidgetUserId();
    localStorage.setItem('widgetUserId', widgetUserId);
}

// Usaremos agora este widgetUserId para isolar as notas de cada utilizador
// ── Fim das alterações ──

// Seletores do DOM
const salvarNotaBtn     = document.getElementById('salvar-nota');
const listaNotas        = document.getElementById('lista-notas');
const notaTexto         = document.getElementById('nota-texto');
const notaCor           = document.getElementById('nota-cor');
const togglePastaBtn    = document.getElementById('toggle-pasta');
const notasContainer    = document.querySelector('.notas-container');
const negritoBtn        = document.getElementById('negrito');
const italicoBtn        = document.getElementById('italico');
const sublinhadoBtn     = document.getElementById('sublinhado');

// Função para carregar as notas salvas do localStorage (chave agora isolada)
function carregarNotas() {
    const notasSalvas = JSON.parse(
        localStorage.getItem(`notas_${widgetUserId}`)
    ) || [];
    notasSalvas.forEach(nota => criarNota(nota.texto, nota.cor));
}

// Função para salvar todas as notas no localStorage
function salvarNotasLocalStorage() {
    const notas = [];
    document.querySelectorAll('.nota').forEach(nota => {
        const texto = nota.querySelector('p').innerHTML;
        const cor   = nota.style.color;
        notas.push({ texto, cor });
    });
    localStorage.setItem(
        `notas_${widgetUserId}`,
        JSON.stringify(notas)
    );
}

// Função para criar uma nova nota na interface
function criarNota(texto, cor) {
    const nota = document.createElement('div');
    nota.classList.add('nota');
    nota.style.color = cor;

    const tituloNota = document.createElement('h4');
    tituloNota.textContent = 'Nota';

    const conteudoNota = document.createElement('p');
    conteudoNota.innerHTML = texto;
    conteudoNota.contentEditable = "false";

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', () =>
        editarNota(nota, conteudoNota, editarBtn)
    );

    const apagarBtn = document.createElement('button');
    apagarBtn.textContent = 'Apagar';
    apagarBtn.addEventListener('click', () =>
        apagarNota(nota)
    );

    const salvarEdicaoBtn = document.createElement('button');
    salvarEdicaoBtn.textContent = 'Salvar';
    salvarEdicaoBtn.style.display = 'none';
    salvarEdicaoBtn.addEventListener('click', () =>
        salvarEdicao(nota, conteudoNota, editarBtn, salvarEdicaoBtn)
    );

    btnContainer.appendChild(editarBtn);
    btnContainer.appendChild(salvarEdicaoBtn);
    btnContainer.appendChild(apagarBtn);

    nota.appendChild(tituloNota);
    nota.appendChild(conteudoNota);
    nota.appendChild(btnContainer);

    listaNotas.appendChild(nota);
    salvarNotasLocalStorage();
}

// Edições, exclusões e formatações seguem idênticos ao original
function editarNota(nota, conteudoNota, editarBtn) {
    conteudoNota.contentEditable = "true";
    conteudoNota.focus();
    editarBtn.style.display = 'none';
    nota.querySelector('.btn-container button:nth-child(2)')
        .style.display = 'inline';
}

function salvarEdicao(nota, conteudoNota, editarBtn, salvarEdicaoBtn) {
    conteudoNota.contentEditable = "false";
    editarBtn.style.display = 'inline';
    salvarEdicaoBtn.style.display = 'none';
    salvarNotasLocalStorage();
}

function apagarNota(nota) {
    listaNotas.removeChild(nota);
    salvarNotasLocalStorage();
}

salvarNotaBtn.addEventListener('click', () => {
    const texto = notaTexto.innerHTML;
    const cor   = notaCor.value;

    if (texto.trim() !== '') {
        criarNota(texto, cor);
        notaTexto.innerHTML = '';
    } else {
        alert('Por favor, escreve uma nota!');
    }
});

togglePastaBtn.addEventListener('click', () => {
    notasContainer.style.display =
        (notasContainer.style.display === 'block')
        ? 'none'
        : 'block';
});

negritoBtn.addEventListener('click', () => {
    document.execCommand('bold');
});
italicoBtn.addEventListener('click', () => {
    document.execCommand('italic');
});
sublinhadoBtn.addEventListener('click', () => {
    document.execCommand('underline');
});

notaCor.addEventListener('input', () => {
    document.execCommand('foreColor', false, notaCor.value);
});

notaTexto.style.color = '#ffffff';

// Carrega as notas quando o widget é inicializado
document.addEventListener('DOMContentLoaded', carregarNotas);
