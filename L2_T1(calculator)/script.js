const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let operator = null;

// Function to update the display
function updateDisplay(value) {
     if (value === '' || value === 'Infinity') {
          display.textContent = '0';
     } else {
          display.textContent = value;
     }
}

// Handle button clicks
buttons.forEach(button => {
     button.addEventListener('click', () => {
          const buttonValue = button.textContent;

          if (button.classList.contains('number')) {
               if (currentInput === '' && buttonValue === '.') {
                    currentInput = '0.';
               } else {
                    currentInput += buttonValue;
               }
               updateDisplay(currentInput);
          }

          if (button.classList.contains('operator')) {
               if (firstOperand === '' && currentInput !== '') {
                    firstOperand = currentInput;
               } else if (currentInput !== '') {
                    secondOperand = currentInput;
                    calculate();
               }
               operator = button.getAttribute('data-op');
               currentInput = '';
          }

          if (buttonValue === 'C') {
               currentInput = '';
               firstOperand = '';
               secondOperand = '';
               operator = null;
               updateDisplay('0');
          }

          if (buttonValue === 'DEL') {
               currentInput = currentInput.slice(0, -1);
               updateDisplay(currentInput);
          }

          if (buttonValue === '=') {
               if (firstOperand !== '' && currentInput !== '') {
                    secondOperand = currentInput;
                    calculate();
                    operator = null;
                    currentInput = firstOperand; // To enable chaining operations
               }
          }
     });
});

// Function to handle calculations
function calculate() {
     let result;
     const num1 = parseFloat(firstOperand);
     const num2 = parseFloat(secondOperand);

     if (isNaN(num1) || isNaN(num2)) return;

     switch (operator) {
          case '+':
               result = num1 + num2;
               break;
          case '-':
               result = num1 - num2;
               break;
          case '*':
               result = num1 * num2;
               break;
          case '/':
               result = num1 / num2;
               break;
          default:
               return;
     }

     firstOperand = result.toString();
     currentInput = '';
     updateDisplay(firstOperand);
}
