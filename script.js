const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeUpper = document.getElementById('includeUpper');
const includeLower = document.getElementById('includeLower');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthIndicator = document.getElementById('strengthIndicator').querySelector('span');

const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+=-?/";

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordDisplay.value).then(() => {
    alert("Password copied to clipboard!");
  });
});

generateBtn.addEventListener('click', () => {
  let password = '';
  let characters = '';

  if (includeUpper.checked) characters += upperSet;
  if (includeLower.checked) characters += lowerSet;
  if (includeNumbers.checked) characters += numberSet;
  if (includeSymbols.checked) characters += symbolSet;

  if (!characters) {
    alert("Please select at least one character type.");
    return;
  }

  for (let i = 0; i < lengthSlider.value; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    password += characters[randIndex];
  }

  passwordDisplay.value = password;
  updateStrength(password);
});

function updateStrength(password) {
  let strength = 0;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;

  if (strength <= 2) {
    strengthIndicator.textContent = "Weak";
    strengthIndicator.style.color = "#ff4d4d";
  } else if (strength <= 4) {
    strengthIndicator.textContent = "Moderate";
    strengthIndicator.style.color = "#ffaa00";
  } else {
    strengthIndicator.textContent = "Strong";
    strengthIndicator.style.color = "#00ffab";
  }
}
