const resultEl = document.querySelector(".result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("number");
const symbolsEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumbers,
  symbol: getRandomSymbols,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  let typeCount = lower + upper + number + symbol;
  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((item) => Object.values(item)[0]);

  if (typeCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach((type) => {
      const key = Object.keys(type)[0];
      generatedPassword += randomFunc[key]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// To generate lowercase letters you have to be between 97 to 122 char-code
function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// To generate Uppercase letters you have to be between 65 to 90 char-code
function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// To generate Numbers letters you have to be between 48 to 57 char-code
function getRandomNumbers() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
  const symbols = "!@#$%^&*{}()[]=+<>/?,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Clipboard functionality
clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password) return;
  // Use navigator.clipboard if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(password);
  } else {
    // fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  // Optionally, show a copied message
  clipboardEl.classList.add("copied");
  setTimeout(() => clipboardEl.classList.remove("copied"), 1000);
  alert("Password copied to clipboard!");
});
