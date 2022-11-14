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
    alert(x+' '+operator+ ' '+y);
}

function clearDisplay() {
    display.textContent = '';
    currDisplayVal = '';
}

let currDisplayVal;
let currOperation;
let x;
let y;


const display = document.querySelector("#display");

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', clearDisplay);

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
        if(operation != '='){
            x = currDisplayVal;
            currOperation = operation;
            clearDisplay();
        } else {
            y = currDisplayVal;
            clearDisplay();
            operate(currOperation, x, y);

        }
    });
});
