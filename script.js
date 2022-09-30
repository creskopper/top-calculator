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

function populate(btn) {

    // Digit Button
    if (btn.classList.value == "btn digit") {

        if (displayValue.length == 9) return;

        if (displayValue.includes(".") && btn.id == "point") return;
        if (displayValue == "" && btn.id == "point") {
            displayValue = "0.";
            display.textContent = displayValue;
        } else {
            displayValue += btn.textContent;
            display.textContent = displayValue;
        }


        if (operatorClicked) {
            secondNumber = displayValue;

            if ((operator == "÷") && (secondNumber == 0)) solution = "Error";
            else if (firstNumber == "Error") solution = "Error";
            else {
                solution = operate(Number(firstNumber), Number(secondNumber), operator);
                if (solution ==  null) return;
                else solution = parseFloat(solution.toFixed(8));    
            }
        }
    }

    // Operator Button
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

    // Equal Button
    if (btn.id == "equal") {
        if (solution == undefined) return;
        else {
            display.textContent = solution;
            firstNumber = null;
            secondNumber = null;
            operator = null;
            displayValue = "";
        }
    }

    // Clear Button
    if (btn.id == "clear") {
        operatorClick = false;
        displayValue = "";
        display.textContent = "0";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        solution = null;
    }

    // Backspace Button
    if (btn.id == "backspace") {

        if (displayValue.length == 0) return;
        else if (displayValue.length == 1) {
            displayValue = "";
            display.textContent = "0";
            secondNumber = displayValue;
            solution = operate(Number(firstNumber), Number(secondNumber), operator);
            if (solution ==  null) return;
            else solution = parseFloat(solution.toFixed(8));
        } else {
            displayValue = displayValue.slice(0, displayValue.length-1);
            display.textContent = displayValue;
            secondNumber = displayValue;
            solution = operate(Number(firstNumber), Number(secondNumber), operator);
            if (solution ==  null) return;
            else solution = parseFloat(solution.toFixed(8));
        }
    }

    // console.log({displayValue}, {firstNumber}, {operator}, {secondNumber}, "=", {solution});
}

listOfBtn.map(btn => {
    btn.addEventListener("click", () => {

        populate(btn);

    })
})

window.addEventListener("keydown", (e) => {
    const generalKey = document.querySelector(`button[data-general-key="${e.code}"]`);
    if (!generalKey) return;
    populate(generalKey);
})

window.addEventListener("keydown", (e) => {
    const numpadKey = document.querySelector(`button[data-numpad-key="${e.code}"]`);
    if (!numpadKey) return;
    populate(numpadKey);
})