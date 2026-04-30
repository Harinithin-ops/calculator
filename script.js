// Get display and all buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to store calculator state
let currentInput = '0';     // The number currently being typed
let previousInput = '';     // The previous number
let operator = '';          // The math operator (+, -, *, /)

// Function to update the screen
function updateDisplay() {
    if (operator === '') {
        display.textContent = currentInput;
    } else {
        // Show the full equation: e.g. "5 + 3"
        display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    }
}

// Function to perform the math calculation
function calculate() {
    // Stop if we don't have both numbers
    if (previousInput === '' || currentInput === '') return;

    // Convert strings to numbers
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    // Do the math based on the operator
    if (operator === '+') result = num1 + num2;
    if (operator === '−') result = num1 - num2;
    if (operator === '×') result = num1 * num2;
    if (operator === '÷') {
        if (num2 === 0) {
            alert("Cannot divide by zero!");
            return;
        }
        result = num1 / num2;
    }

    // Save the result as the new current input
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Add click events to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.number;

        // 1. If a Number button is clicked
        if (button.classList.contains('number')) {
            // Prevent adding multiple decimals (e.g. "5..2")
            if (number === '.' && currentInput.includes('.')) return;
            
            // If screen is just '0', replace it. Otherwise, add to it.
            if (currentInput === '0' && number !== '.') {
                currentInput = number; 
            } else {
                currentInput += number;
            }
            updateDisplay();
        }

        // 2. If an Operator button (+, -, ×, ÷) is clicked
        if (button.classList.contains('operator')) {
            // If we are already in the middle of a calculation, finish it first
            if (previousInput !== '' && currentInput !== '') {
                calculate();
            }
            
            operator = button.textContent; // Get the symbol directly from the HTML button
            
            // Move current number to previous so we can type the next number
            if (currentInput !== '') {
                 previousInput = currentInput;
                 currentInput = '';
            }
            updateDisplay();
        }

        // 3. Action buttons (=, AC, DEL, %)
        if (action === 'calculate') {
            calculate();
        }

        if (action === 'clear') {
            currentInput = '0';
            previousInput = '';
            operator = '';
            updateDisplay();
        }

        if (action === 'delete') {
            // Remove the last character
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') currentInput = '0'; // Default to 0 if empty
            updateDisplay();
        }

        if (action === 'percent') {
            // Divide the current number by 100
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
    });
});
