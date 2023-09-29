const calcTypeSelect = document.getElementById('calcType');
const inputFields = document.getElementById('inputFields');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');

calcTypeSelect.addEventListener('change', () => {
  inputFields.innerHTML = ''; // Clear previous inputs
  const calcType = calcTypeSelect.value;
  
  if (calcType === 'simple') {
    inputFields.innerHTML = `
      <label for="principal">Principal:</label>
      <input type="number" id="principal" required> <br> <br>
      
      <label for="rate">Rate of Interest:</label>
      <input type="number" id="rate" required> <br> <br>
      
      <label for="time">Time (years):</label>
      <input type="number" id="time" required> <br> <br>
    `;
  }
  else if (calcType === 'compound') {
    inputFields.innerHTML = `
      <label for="principal">Principal:</label>
      <input type="number" id="principal" required>
      
      <label for="rate">Annual Rate of Interest:</label>
      <input type="number" id="rate" required>
      
      <label for="time">Time (years):</label>
      <input type="number" id="time" required>
      
      <label for="compoundingFreq">Compounding Frequency:</label>
      <select id="compoundingFreq">
        <option value="annually">Annually</option>
        <option value="semiannually">Semiannually</option>
        <option value="quarterly">Quarterly</option>
        <option value="monthly">Monthly</option>
      </select>
    `;
  }
  else if (calcType === 'EMI') {
    inputFields.innerHTML = `
      <label for="principal">Principal:</label>
      <input type="number" id="principal" required>
      
      <label for="rate">Rate of Interest:</label>
      <input type="number" id="rate" required>
      
      <label for="time">Time (months):</label>
      <input type="number" id="time" required>
    `;
  }
});

calculateBtn.addEventListener('click', () => {
  const calcType = calcTypeSelect.value;
  
  if (calcType === 'simple') {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    
    const simpleInterest = (principal * rate * time) / 100;
    
    result.innerText = `Simple Interest: ${simpleInterest.toFixed(2)}`;
  }
  else if (calcType === 'compound') {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    const compoundingFreq = document.getElementById('compoundingFreq').value;
    
    let n = 1;
    if (compoundingFreq === 'annually') {
      n = 1;
    } else if (compoundingFreq === 'semiannually') {
      n = 2;
    } else if (compoundingFreq === 'quarterly') {
      n = 4;
    } else if (compoundingFreq === 'monthly') {
      n = 12;
    }
    
    const compoundInterest = principal * (Math.pow((1 + rate / (n * 100)), (n * time)) - 1);
    
    result.innerText = `Compound Interest: ${compoundInterest.toFixed(2)}`;
  }
  else if (calcType === 'EMI') {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    
    const monthlyInterestRate = rate / (12 * 100);
    const numberOfPayments = time;
    
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    result.innerText = `EMI: ${emi.toFixed(2)}`;
  }  
});
