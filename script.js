// Função para adicionar um número ao visor
function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
}

// Função para adicionar um operador ao visor
function appendOperator(operator) {
    const display = document.getElementById('display');
    const lastChar = display.value[display.value.length - 1];

    // Evitar operadores duplicados
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// Função para limpar o visor
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Função para apagar o último caractere
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Função para calcular o resultado
function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Erro';
    }
}
