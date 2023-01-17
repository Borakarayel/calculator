console.log(document.readyState);
console.log(performance.now());
document.addEventListener("readystatechange", () => {
  if (document.readyState == "interactive") {
    console.log(performance.now());
  }
  if (document.readyState == "complete") {
    console.log(performance.now());
  }
});

let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", () => {
  const clearAll = document.querySelector("#key19");
  const equal = document.querySelector("#key22");
  const decimal = document.querySelector("#key21");

  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");

  const previousScreen = document.querySelector(".previous");
  const currentScreen = document.querySelector(".current");

  numbers.forEach((number) => number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentValue;
  }));

  operators.forEach((op) => op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
    previousScreen.textContent = `${previousValue} ${operator}`;
    currentScreen.textContent = currentValue;
  }));

  clearAll.addEventListener("click", () => {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equal.addEventListener("click", () => {
    if (currentValue != "" && previousValue != "") {
      calculate();
      previousScreen.textContent = "Result:";
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = `${previousValue.slice(0, 7)}...`;
      }
    }
  });

  decimal.addEventListener("click", () => {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "X") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
