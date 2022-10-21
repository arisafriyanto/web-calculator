// ! Object Utama

const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  isWaitSecondNumber: false,
};

// ! Update display

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// ! Clear Calculator

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.isWaitSecondNumber = false;
}

// ! Input Digit

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// ! Menginisialisasikan nilai seluruh elemen button yang ada dan berikan event click pada tiap elemennya.

const buttons = document.querySelectorAll(".button");

for (const button of buttons) {
  button.addEventListener("click", function (event) {
    // ! mendapatkan element yang diclick

    const target = event.target;

    // ! jika mengandung class clear

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // ! jika mengandung class negative
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.isWaitSecondNumber) {
    calculator.operator = operator;
    calculator.isWaitSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else if (calculator.isWaitSecondNumber) {
    performCalculation();
    updateDisplay();
    calculator.operator = operator;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  }
  // alert("Operator sudah ditetapkan.");
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Operator belum ditentukan.");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }
  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}
