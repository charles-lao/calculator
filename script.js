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
        case 'X':
            updateDisplay(multiply(x, y));
            storedVal = multiply(x, y);         
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

const display = document.querySelector("#display");

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', () => {
    clearDisplay();
    resetValues();
});

const numBtns = document.querySelectorAll(".grey-btns");
numBtns.forEach((numBtn) => {
    numBtn.addEventListener('click', () => {

        //does a period check
        if(numBtn.value == '.'){
            if(periodFilter(display.textContent)){
                //do nothing if there is a period already
            } else {
                display.textContent += numBtn.value;
                currDisplayVal = Number(display.textContent);
            }
        } else {
            display.textContent += numBtn.value;
            currDisplayVal = Number(display.textContent);
        }
        
    });
});

const operateBtns = document.querySelectorAll(".orange-btns");
operateBtns.forEach((operateBtn) => {
    operateBtn.addEventListener('click', () => {

        let operation = operateBtn.value
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
    });
});
