// Selecting elements from the DOM
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputAnswer = document.getElementById('inputAnswer');
const equation = document.getElementById('equation');
const clear = document.getElementById('clear');
const deleteInputs = document.getElementById('delete');
const historyArea = document.querySelector('.history');
const mainArea = document.querySelector('.calculator-container');

// Hide the history section initially
historyArea.style.display = "none";

// Function to toggle the visibility of the history area
function displayHistory() {
    if (historyArea.style.display === "none") {
        historyArea.style.display = "";
        mainArea.style.borderRadius = "10px 0px 0px 10px";
    } else {
        historyArea.style.display = "none";
        mainArea.style.borderRadius = "10px";
    }
}

document.getElementById('showHistory').addEventListener('click', displayHistory);

// Array to hold the history of calculations
const history = [];

// Function to add an entry to the history list
function addToHistory(entry) {
    history.push(entry);
    const historyList = document.querySelector('.history ul');
    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = entry;
    historyList.appendChild(newHistoryItem);
}

let operand1 = null;
let operator = null;

// Allow only numbers, decimal point, and operators in the input
inputAnswer.addEventListener("input", function (e) {
    inputAnswer.value = inputAnswer.value.replace(/[^0-9+\-*/.]/g, "");
});

// Function to handle number button clicks
function displayNumber(event) {
    const clickedNumber = event.target;
    const inputValue = inputAnswer.value;

    if (inputValue === '0') {
        inputAnswer.value = clickedNumber.textContent;
    } else {
        inputAnswer.value += clickedNumber.textContent;
    }
}

numbers.forEach(number => {
    number.addEventListener('click', displayNumber);
});

// Function for the '00' button
function displayDoubleZero() {
    if (inputAnswer.value !== '0') {
        inputAnswer.value += '00';
    }
}

document.getElementById('doubleZero').addEventListener('click', displayDoubleZero);

// Function to clear the input
function clearInput() {
    equation.style.visibility = "hidden";
    inputAnswer.value = '0';
    operand1 = null;
    operator = null;
    equation.textContent = '0';
}

clear.addEventListener('click', clearInput);

// Function to delete the last character in the input
function deleteInput() {
    let inputValue = inputAnswer.value;
    if (inputValue.length > 1) {
        inputAnswer.value = inputValue.slice(0, -1);
    } else {
        inputAnswer.value = '0';
    }
}

deleteInputs.addEventListener('click', deleteInput);

// Function to change the sign of the input number
function changeSign() {
    const currentText = inputAnswer.value;
    if (currentText !== '0') {
        inputAnswer.value = currentText.startsWith('-') ? currentText.slice(1) : '-' + currentText;
    }
}

document.getElementById('positiveNegative').addEventListener('click', changeSign);

// Function to perform the calculation based on the selected operator
function performCalculation() {
    const inputValue = parseFloat(inputAnswer.value);
    if (operand1 !== null && operator !== null) {
        let result;
        switch (operator) {
            case '+':
                result = operand1 + inputValue;
                break;
            case '-':
                result = operand1 - inputValue;
                break;
            case '*':
                result = operand1 * inputValue;
                break;
            case '÷':
                result = operand1 / inputValue;
                break;
            case '%':
                result = (operand1 / 100) * inputValue;
                break;
            default:
                return;
        }

        // Display result and add to history
        inputAnswer.value = result % 1 === 0 ? result.toFixed(0) : result.toFixed(4);
        equation.textContent = `${operand1} ${operator} ${inputValue} =`;
        addToHistory(`${equation.textContent} ${inputAnswer.value}`);
        operand1 = null;
        operator = null;
    }
}

document.getElementById('calculate').addEventListener('click', performCalculation);

// Set operator and prepare for the next operand
operators.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        equation.style.visibility = "visible";
        operand1 = parseFloat(inputAnswer.value);
        operator = operatorButton.textContent;
        equation.textContent = operand1 + " " + operator;
        inputAnswer.value = '0';
    });
});

// Function to calculate the square root
function squareRootOf() {
    const inputValue = parseFloat(inputAnswer.value);
    if (inputValue >= 0) {
        const result = Math.sqrt(inputValue);
        equation.style.visibility = "visible";
        equation.textContent = `√${inputValue}`;
        inputAnswer.value = result.toFixed(4);
        addToHistory(`${equation.textContent} = ${inputAnswer.value}`);
    }
}

document.getElementById('squareRoot').addEventListener('click', squareRootOf);

// Function to calculate the square of a number
function squareOf() {
    const inputValue = parseFloat(inputAnswer.value);
    const result = Math.pow(inputValue, 2);
    equation.style.visibility = "visible";
    equation.textContent = `${inputValue}²`;
    inputAnswer.value = result.toFixed(4);
    addToHistory(`${equation.textContent} = ${inputAnswer.value}`);
}

document.getElementById('squared').addEventListener('click', squareOf);

// Function to reset everything
function restartAll() {
    location.reload();
}

document.getElementById('allClear').addEventListener('click', restartAll);
