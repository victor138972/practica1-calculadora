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


document.getElementById('modeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const modeToggle = document.getElementById('modeToggle');
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerText = '🌙 Modo oscuro';
    } else {
        modeToggle.innerText = '☀️ Modo claro';
    }
});

document.getElementById('modeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const modeToggle = document.getElementById('modeToggle');
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerText = '🌙 Modo oscuro';
    } else {
        modeToggle.innerText = '☀️ Modo claro';
    }
});

document.getElementById("percentage").addEventListener("click", () => {
    if (currentNumber !== '') {
        currentNumber = parseFloat(currentNumber) / 100;
        display.value = currentNumber;
    }
});

document.getElementById("square").addEventListener("click", () => {
    if (currentNumber !== '') {
        currentNumber = Math.pow(parseFloat(currentNumber), 2);
        display.value = currentNumber;
    }
});

document.getElementById("sqrt").addEventListener("click", () => {
    if (currentNumber >= 0 && currentNumber !== '') {
        currentNumber = Math.sqrt(parseFloat(currentNumber));
        display.value = currentNumber;
    } else {
        alert('Error: Raíz cuadrada de número negativo');
    }
});

document.getElementById("plusMinus").addEventListener("click", () => {
    if (currentNumber !== '') {
        currentNumber = -parseFloat(currentNumber);
        display.value = currentNumber;
    }
});


document.getElementById('modeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

equals.addEventListener('click', () => {
    calculate();
    currentOperator = '';
    display.value = currentNumber;
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
                if (parseFloat(currentNumber) !== 0) {
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                } else {
                    alert('Error: División por cero'); 
                    return;
                }
                break;
        }
        currentNumber = result;
        previousNumber = '';
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key; 

    
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
        } else if (key === 'Enter') { 
            equals.click();
        } else if (key.toLowerCase() === 'c') { 
            clear.click();
        } else if (key === 'Backspace') { 
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
        }
    }
});