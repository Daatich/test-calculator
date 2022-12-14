class Calculator {
  constructor(firstOperandTextElement, secondOperandTextElement) {
    this.firstOperandTextElement = firstOperandTextElement;
    this.secondOperandTextElement = secondOperandTextElement;
    this.clear();
  }

  clear() {
    this.firstOperand = "";
    this.secondOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.secondOperand = this.secondOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.secondOperand.includes(".")) return;
    this.secondOperand = this.secondOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.secondOperand === "") return;
    if (this.firstOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.firstOperand = this.secondOperand;
    this.secondOperand = "";
  }
  compute() {
    let computation;
    const first = parseFloat(this.firstOperand);
    const second = parseFloat(this.secondOperand);
    if (isNaN(first) || isNaN(second)) return;
    switch (this.operation) {
      case "+":
        computation = first + second;
        break;
      case "-":
        computation = first - second;
        break;
      case "*":
        computation = first * second;
        break;
      case "÷":
        computation = first / second;
        break;
      default:
        return;
    }
    this.secondOperand = computation;
    this.operation = undefined;
    this.firstOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
      return integerDisplay;
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  }
  updateDisplay() {
    this.secondOperandTextElement.innerText = this.getDisplayNumber(
      this.secondOperand
    );
    if (this.operation != null) {
      this.firstOperandTextElement.innerText = `${this.getDisplayNumber(
        this.firstOperand
      )} ${this.operation}`;
    } else {
      this.firstOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const clearButtons = document.querySelector("[data-clear]");
const firstOperandTextElement = document.querySelector("[data-first-operand]");
const secondOperandTextElement = document.querySelector(
  "[data-second-operand]"
);

const calculator = new Calculator(
  firstOperandTextElement,
  secondOperandTextElement
);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButtons.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButtons.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
