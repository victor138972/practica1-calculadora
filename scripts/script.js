let display = document.getElementById('display');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clear = document.getElementById('clear');
let equals = document.getElementById('equals');
let currentNumber = '';
let previousNumber = '';
let currentOperator = '';

numbers.forEach(number => {
    number.addEventListener('click', () => {
        currentNumber += number.innerText;
        display.value += number.innerText;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (currentOperator) {
            calculate();
        }
        previousNumber = currentNumber;
        currentNumber = '';
        currentOperator = operator.innerText;
        display.value += operator.innerText;
    });
});

equals.addEventListener('click', () => {
    calculate();
    currentOperator = '';
});

clear.addEventListener('click', () => {
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    display.value = '';
});

document.getElementById("percentage").addEventListener("click", () => {
    currentNumber = parseFloat(currentNumber) / 100;
    display.value = currentNumber;
});

document.getElementById("square").addEventListener("click", () => {
    currentNumber = Math.pow(parseFloat(currentNumber), 2);
    display.value = currentNumber;
});

document.getElementById("reciprocal").addEventListener("click", () => {
    currentNumber = 1 / parseFloat(currentNumber);
    display.value = currentNumber;
});

document.getElementById("sqrt").addEventListener("click", () => {
    currentNumber = Math.sqrt(parseFloat(currentNumber));
    display.value = currentNumber;
});

document.getElementById("plusMinus").addEventListener("click", () => {
    currentNumber = -parseFloat(currentNumber);
    display.value = currentNumber;
});

// ... (resto del código)

equals.addEventListener('click', () => {
    calculate();
    currentOperator = '';
    display.value = currentNumber; // Añadido: actualizar el contenido de la caja de texto con el resultado
});

function calculate() {
    let result;
    if (currentOperator && previousNumber && currentNumber) {
        switch (currentOperator) {
            case '+':
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;
            case '-':
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;
            case 'x':
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;
            case '÷':
                result = parseFloat(previousNumber) / parseFloat(currentNumber);
                break;
        }
        currentNumber = result;
        previousNumber = '';
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key; // obtener la tecla presionada

    // si la tecla es un número, simular un click en el botón correspondiente
    if (!isNaN(key)) {
        let button = Array.from(numbers).find(number => number.innerText === key);
        if (button) button.click();
    } else {
        let operator;
        switch (key) {
            case '+':
                operator = 'add';
                break;
            case '-':
                operator = 'subtract';
                break;
            case 'x':
                operator = 'multiply';
                break;
            case '÷':
                operator = 'divide';
                break;
        }
        if (operator) {
            document.getElementById(operator).click();
        } else if (key === 'Enter') { // si la tecla es Enter, simular un click en el botón de igual
            equals.click();
        } else if (key.toLowerCase() === 'c') { // si la tecla es 'c', simular un click en el botón de limpiar
            clear.click();
        } else if (key === 'Backspace') { // si la tecla es Backspace, borrar el último carácter
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
        }
    }
});


