let currDisplayVal;
let currOperation;
let x;
let y;
let storedVal;
let prevOperation;

const display = document.querySelector('#display');

// checks if num is whole number and appends decimals if false
function decimalFilter(result) {
  if ((result % 1) === 0) {
    return result;
  }
  return result.toFixed(2);
}

function updateDisplay(value) {
  currDisplayVal = value;
  display.textContent = value;
}

function clearDisplay() {
  display.textContent = '';
  currDisplayVal = '';
}

function resetValues() {
  x = undefined;
  y = undefined;
  currOperation = undefined;
  storedVal = undefined;
  prevOperation = undefined;
}

// checks if there's a period on the display already
function periodFilter(string) {
  if (currDisplayVal !== undefined) {
    string = string.toString();

    if (string.includes('.')) {
      return true;
    }
    return false;
  }
}

function add(a, b) {
  return decimalFilter(a + b);
}

function subtract(a, b) {
  return decimalFilter(a - b);
}

function multiply(a, b) {
  return decimalFilter(a * b);
}

function modulo(a, b) {
  return (a % b);
}

function divide(a, b) {
  return decimalFilter(a / b);
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      updateDisplay(add(a, b));
      storedVal = add(a, b);
      break;
    case '-':
      updateDisplay(subtract(a, b));
      storedVal = subtract(a, b);
      break;
    case 'x':
      updateDisplay(multiply(a, b));
      storedVal = multiply(a, b);
      break;
    case '*':
      updateDisplay(multiply(a, b));
      storedVal = multiply(a, b);
      break;
    case '%':
      updateDisplay(modulo(a, b));
      storedVal = modulo(a, b);
      break;
    case '/':
      if (b === 0) {
        alert('ERROR! Unable to divide by Zero. Please try again.');
        clearDisplay();
        resetValues();
        break;
      }
      updateDisplay(divide(a, b));
      storedVal = divide(a, b);
      break;
    default:
      alert(`Error! Operator is ${operator}`);
      clearDisplay();
      resetValues();
      break;
  }
}

function inputNumber(numKey) {
  // does a period check
  if (numKey == '.') {
    if (periodFilter(display.textContent)) {
      // do nothing if there is a period already
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
  if (operation !== '=' && x === undefined) {
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
    if (storedVal !== undefined) {
      x = storedVal;
    }
    y = currDisplayVal;
    operate(prevOperation, x, y);
    resetValues();
  }
}

// delete last character from string
function backSpace() {
  if (currDisplayVal !== undefined && display.textContent !== undefined) {
    const screenDisplay = display.textContent;

    currDisplayVal = currDisplayVal.toString();
    currDisplayVal = Number(currDisplayVal.slice(0, -1));
    display.textContent = screenDisplay.slice(0, -1);
  }
}

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
  clearDisplay();
  resetValues();
});

// backspace btn
const delBtn = document.querySelector('#del-btn');
delBtn.addEventListener('click', () => {
  backSpace();
});

const numBtns = document.querySelectorAll('.grey-btns');
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', () => {
    inputNumber(numBtn.value);
  });
});

const operateBtns = document.querySelectorAll('.operator-btns');
operateBtns.forEach((operateBtn) => {
  operateBtn.addEventListener('click', () => {
    startOperation(operateBtn.value);
  });
});

window.addEventListener('keydown', (e) => {
  const validOperators = ['+', '-', '*', 'x', '=', 'Enter', '/', '%'];

  // check if keyboard key pressed is a number
  if (!isNaN(parseInt(e.key))) {
    inputNumber(e.key);
  } else if (e.key == '.') {
    inputNumber(e.key);
  }

  // check if key pressed is a valid math operator
  if (validOperators.includes(e.key)) {
    if (e.key == 'Enter') {
      startOperation('=');
    } else {
      startOperation(e.key);
    }
  }

  if (e.key === 'Backspace') {
    backSpace();
  }
});
