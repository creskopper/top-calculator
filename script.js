// Math functions
function add(a, b) {
    return a + b;
}
  
function subtract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}

function operate(x, y, operator) {
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "x":
            return multiply(x, y);
        case "÷":
            return divide(x, y);
  
        default: break;
    }
}

const display = document.querySelector(".display");
const btn = document.querySelectorAll(".btn");
const listOfBtn = Array.from(btn);
let displayValue = "";
let firstNumber = null;
let secondNumber = null;
let operator = null;
let solution = null;
let operatorClicked = false;

listOfBtn.map(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.value == "btn digit") {
            displayValue += btn.textContent;
            display.textContent = displayValue;

            if (operatorClicked) {
                secondNumber = displayValue;
                solution = operate(Number(firstNumber), Number(secondNumber), operator);
            }
        }

        if (btn.classList.value == "btn operator") {
            operatorClicked = true;
            secondNumber = null;

            if (solution == null) firstNumber = displayValue;
            else {
                firstNumber = solution;
                display.textContent = solution;
            }

            operator = btn.textContent;
            displayValue = "";
        }

        if (btn.id == "equal") {
            display.textContent = solution;
            firstNumber = null;
            secondNumber = null;
            operator = null;
            displayValue = "";
        }

        console.log({displayValue}, {firstNumber}, {operator}, {secondNumber}, "=", {solution});

    })
})