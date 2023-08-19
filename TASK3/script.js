const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clearDisplay();
    } else if (value === '⌫') {
      backspace();
    } else {
      appendToDisplay(value);
    }
  });
});

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const expression = display.value;
  const operators = ['+', '-', '*', '/'];

  let currentOperator = '';
  let operands = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (operators.includes(char)) {
      operands.push(parseFloat(currentOperator));
      operands.push(char);
      currentOperator = '';
    } else {
      currentOperator += char;
    }
  }
  operands.push(parseFloat(currentOperator));

  let result = operands[0];
  for (let i = 1; i < operands.length; i += 2) {
    const operator = operands[i];
    const operand = operands[i + 1];

    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    } else if (operator === '*') {
      result *= operand;
    } else if (operator === '/') {
      result /= operand;
    }
  }

  display.value = result;
}
