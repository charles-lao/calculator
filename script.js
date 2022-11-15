function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch(operator) {
        case '+':
            updateDisplay(add(x, y));
            storedVal = currDisplayVal;
            resetValues();
            break;
        case '-':
            updateDisplay(subtract(x,y));
            storedVal = currDisplayVal;
            resetValues();
            break;
        case 'x':
            updateDisplay(multiply(x,y));
            storedVal = currDisplayVal;
            resetValues();
            break;
        case '/':
            updateDisplay(divide(x,y));
            storedVal = currDisplayVal;
            resetValues();
            break;
        default:
            break;
    }
}

function clearDisplay() {
    display.textContent = '';
    currDisplayVal = '';
}

function updateDisplay(value){
    currDisplayVal = value;
    display.textContent = value;
}

function resetValues(){
    x = undefined;
    y = undefined;
    currOperation = undefined;
}

let currDisplayVal;
let currOperation;
let x;
let y;
let storedVal;


const display = document.querySelector("#display");

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', clearDisplay, resetValues);

const numBtns = document.querySelectorAll(".grey-btns");
numBtns.forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
        display.textContent += numBtn.value;
        currDisplayVal = display.textContent;
    });
});

const operateBtns = document.querySelectorAll(".orange-btns");
operateBtns.forEach((operateBtn) => {
    operateBtn.addEventListener('click', () => {

        let operation = operateBtn.value
        if(operation !== '=' && x === undefined){
            x = Number(currDisplayVal);
            currOperation = operation;
            clearDisplay();
        } else if (operation !== '=' && y === undefined) {
            y = Number(currDisplayVal);
            operate(currOperation, x, y);
            clearDisplay();
        } else if (operation !== '=' && storedVal !== undefined) {
            x = storedVal;
            y = Number(currDisplayVal);
            operate(currOperation, x, y);
            clearDisplay();
            alert(storedVal);
        } else if (operation === '=') {
            //alert('Equals is pressed');
            y = Number(currDisplayVal);
            operate(currOperation, x, y);
            
        }
    });
});
