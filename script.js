let currDisplayVal;
let currOperation;
let x;
let y;
let storedVal;
let prevOperation;

function add(x, y) {
    return decimalFilter(x+y);
}

function subtract(x, y) {
    return decimalFilter(x-y);
}

function multiply(x, y) {
    return decimalFilter(x * y);
}

function modulo(x, y) {
    return (x % y);
}

function divide(x, y) {
    return decimalFilter(x / y);
}

function operate(operator, x, y) {
    switch(operator) {
        case '+':
            updateDisplay(add(x, y));
            storedVal = add(x, y);  
            break;
        case '-':
            updateDisplay(subtract(x, y));
            storedVal = subtract(x, y);     
            break;
        case 'x':
            updateDisplay(multiply(x, y));
            storedVal = multiply(x, y);         
            break;
        case '*':
            updateDisplay(multiply(x, y));
            storedVal = multiply(x, y);         
            break;
        case '%':
            updateDisplay(modulo(x, y));
            storedVal = modulo(x, y);         
            break;
        case '/':
            if(y === 0){
                alert("ERROR! Unable to divide by Zero. Please try again.");
                clearDisplay();
                resetValues();
                break;
            }
            updateDisplay(divide(x, y));
            storedVal = divide(x, y);
            break;
        default:
            alert("Error! Operator is "+operator);
            clearDisplay();
            resetValues();
            break;
    }
}

function inputNumber(numKey){

    //does a period check
    if(numKey == '.'){
        if(periodFilter(display.textContent)){
            //do nothing if there is a period already
        } else {
            display.textContent += numKey;
            currDisplayVal = Number(display.textContent);
        }
    } else {
        display.textContent += numKey;
        currDisplayVal = Number(display.textContent);
    }
}

function startOperation(operation) {

    currOperation = operation;
    if(operation !== '=' && x === undefined){
        x = currDisplayVal;
        clearDisplay();
        prevOperation = currOperation;
    } else if (operation !== '=' && y === undefined) {
        y = currDisplayVal;
        operate(prevOperation, x, y);
        prevOperation = currOperation;
        clearDisplay();
    } else if (operation !== '=' && x !== undefined && y !== undefined) {
        x = storedVal;
        y = currDisplayVal;
        operate(prevOperation, x, y);
        prevOperation = operation;
        clearDisplay();
    } else if (operation === '=') {
        if(storedVal !== undefined){
            x = storedVal;
        }
        y = currDisplayVal;
        operate(prevOperation, x, y);
        resetValues();
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
    storedVal = undefined;
    prevOperation = undefined;
}

//checks if num is whole number and appends decimals if false
function decimalFilter(result){

    if((result%1) === 0){
        return result
    } else {
        return result.toFixed(2);
    }
}

//checks if there's a period on the display already
function periodFilter(string){

    if(currDisplayVal !== undefined){
        string = string.toString();

        if(string.includes('.')){
            return true;
        } else {
            false;
        }
    }   
}

//delete last character from string
function backSpace() {

    if(currDisplayVal !== undefined && display.textContent !== undefined) {
        let screenDisplay = display.textContent;

        currDisplayVal = currDisplayVal.toString();
        currDisplayVal = Number(currDisplayVal.slice(0, -1));
        display.textContent = screenDisplay.slice(0, -1);
    } 
}

const display = document.querySelector("#display");

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', () => {
    clearDisplay();
    resetValues();
});

//backspace btn
const delBtn = document.querySelector('#del-btn');
delBtn.addEventListener('click', () => {
    
    backSpace();
     
});

const numBtns = document.querySelectorAll(".grey-btns");
numBtns.forEach((numBtn) => {
    numBtn.addEventListener('click', () => {

        inputNumber(numBtn.value);
        
    });
});

const operateBtns = document.querySelectorAll(".operator-btns");
operateBtns.forEach((operateBtn) => {
    operateBtn.addEventListener('click', () => {

        startOperation(operateBtn.value);
    });
});

window.addEventListener('keydown', function (e) {

    const validOperators = ['+', '-', '*', 'x', '=', 'Enter', '/', '%' ];

    //check if keyboard key pressed is a number
    if (!isNaN(parseInt(e.key))) {
        inputNumber(e.key);
    } else if (e.key == '.') {
        inputNumber(e.key);
    } 
    
    //check if key pressed is a valid math operator
    if (validOperators.includes(e.key)) {
        if(e.key == 'Enter'){
            startOperation('=');
        }else {
            startOperation(e.key);
        }
    }

    if (e.key === 'Backspace') {
        backSpace();
    }

});
