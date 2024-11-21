// Selecting elements from the DOM
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputAnswer = document.getElementById('inputAnswer');
const equation = document.getElementById('equation');
const clear = document.getElementById('clear');
const deleteInputs = document.getElementById('delete');
const historyArea = document.querySelector('.history');
const historyList = document.getElementById('historyList');

historyArea.style.display = "none";

function displayHistory() {
    historyArea.style.display = (historyArea.style.display === "none") ? "" : "none";
}

document.getElementById('showHistory').addEventListener('click', displayHistory);

const history = [];

function addToHistory(entry) {
    history.push(entry);
    
    const newHistoryItem = document.createElement('li');
    const textNode = document.createTextNode(entry);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton'); 
    deleteButton.onclick = function() {
        history.splice(history.indexOf(entry), 1);
        historyList.removeChild(newHistoryItem); 
    };

    newHistoryItem.appendChild(textNode);
    newHistoryItem.appendChild(deleteButton);
    historyList.appendChild(newHistoryItem);
}

let operand1 = null;
let operator = null;

// Allow only numbers, decimal point, and operators in the input
inputAnswer.addEventListener("input", function (e) {
    // Allow only valid characters
    inputAnswer.value = inputAnswer.value.replace(/[^0-9+\-*/=]/g, "");
});

// Function to handle number button clicks
function displayNumber(event) {
    const clickedNumber = event.target;
    const inputValue = inputAnswer.value;

    // Update input value based on current value and clicked number
    if (inputValue === '0' && clickedNumber.textContent !== '.') {
        inputAnswer.value = clickedNumber.textContent; // Replace '0' with the clicked number
    } else {
        inputAnswer.value += clickedNumber.textContent; // Append clicked number
    }
}

numbers.forEach(number => {
    number.addEventListener('click', displayNumber);
});

// Function for the '00' button
document.getElementById('doubleZero').addEventListener('click', function() {
    if (inputAnswer.value !== '0') {
        inputAnswer.value += '00';
    }
});

// Function to clear the input
clear.addEventListener('click', function() {
    equation.style.visibility = "hidden";
    inputAnswer.value = '0';
    operand1 = null;
    operator = null;
});

// Function to delete the last character in the input
deleteInputs.addEventListener('click', function() {
    let inputValue = inputAnswer.value;
    if (inputValue.length > 1) {
        inputAnswer.value = inputValue.slice(0, -1);
    } else {
        inputAnswer.value = '0';
    }
});

// Function to change the sign of the input number
document.getElementById('positiveNegative').addEventListener('click', function() {
    const currentText = inputAnswer.value;
    if (currentText !== '0') {
        inputAnswer.value = currentText.startsWith('-') ? currentText.slice(1) : '-' + currentText;
    }
});
// Add this code after your existing JavaScript code

// Function to clear all history
document.getElementById('deleteAllHistory').addEventListener('click', function() {
    // Clear the history array
    history.length = 0;

    // Clear the history list in the DOM
    const historyList = document.getElementById('historyList');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
});

// Function to perform calculation based on selected operator
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
                if (inputValue === 0) {
                    alert("Cannot divide by zero");
                    return;
                }
                result = operand1 / inputValue;
                break;
            default:
                return; // No valid operator
        }

        // Display result and add to history
        inputAnswer.value = result % 1 === 0 ? result.toFixed(0) : result.toFixed(4);
        equation.textContent = `${operand1} ${operator} ${inputValue} =`;
        addToHistory(`${equation.textContent} ${inputAnswer.value}`);
        
        // Reset operands after calculation
        operand1 = null; 
        operator = null; 
    }
}

// Handle operator button clicks
operators.forEach(operatorButton => {
   operatorButton.addEventListener('click', () => {
       const currentInputValue = parseFloat(inputAnswer.value);

       // If an operator has already been set, perform calculation first
       if (operand1 !== null && operator !== null) {
           performCalculation();
       }

       // Set the new operator and operand
       operand1 = currentInputValue; // Store current value as first operand
       operator = operatorButton.textContent; 
       equation.style.visibility = "visible";
       equation.textContent = `${operand1} ${operator}`; 
       inputAnswer.value = '0'; // Reset display for next number entry
   });
});

// Handle equals button click or typing '=' in the input field
document.getElementById('calculate').addEventListener('click', performCalculation);

// Input event for handling operators typed directly into the answer field
inputAnswer.addEventListener("keydown", function(e) {
    if (['+', '-', '*', '/', '='].includes(e.key)) { // Check if key is an operator or equals sign
        e.preventDefault(); // Prevent default behavior of typing the character

        if (e.key === '=') { // If equals is pressed, perform calculation
            performCalculation();
        } else { // Handle other operators
            const currentInputValue = parseFloat(inputAnswer.value);

            // If an operator has already been set, perform calculation first
            if (operand1 !== null && operator !== null) {
                performCalculation();
            }

            // Set new operator and update equation display
            operand1 = currentInputValue; // Store current value as first operand before new operation
            operator = e.key; // Set new operator based on key pressed
            
            equation.style.visibility = "visible";
            equation.textContent = `${operand1} ${operator}`; 
            inputAnswer.value = '0'; // Reset display for next number entry
        }
    }
});

// Square root function
document.getElementById('squareRoot').addEventListener('click', function() {
   const inputValue= parseFloat(inputAnswer.value);
   if (inputValue >= 0) { 
       const result= Math.sqrt(inputValue); 
       equation.style.visibility= "visible"; 
       equation.textContent= `√${inputValue}`; 
       inputAnswer.value= result.toFixed(4); 
       addToHistory(`${equation.textContent}=${inputAnswer.value}`); 
   } else {
       alert("Cannot calculate square root of a negative number.");
   }
});

// Square function
document.getElementById('squared').addEventListener('click', function() { 
   const inputValue= parseFloat(inputAnswer.value); 
   const result= Math.pow(inputValue, 2); 
   equation.style.visibility= "visible"; 
   equation.textContent= `${inputValue}²`; 
   inputAnswer.value= result.toFixed(4); 
   addToHistory(`${equation.textContent}=${inputAnswer.value}`); 
});

// Reset everything
document.getElementById('allClear').addEventListener('click', function() { 
   location.reload(); 
});