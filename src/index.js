const historyButton = document.getElementById('history-button');
const historyList = document.getElementById('history-list');
const buttonsContainer = document.getElementById('buttons-container');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const allclearButton = document.querySelector('.allclear-button');
const backButton = document.querySelector('.back-button');
const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');
const plusminus = document.querySelector('.plusminus-button');
const mainOperation = document.getElementById('main-operation');
const mainAnswer = document.getElementById('main-answer');

const calculation = {
    num1: '',
    operation: '',
    symbol: '',
    num2: '',
    ans: '',
}

// ----- Utility -----

const calc = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b),
    sqrt: (a, b) => Math.sqrt(a),
  }

function getStatus() {
    if(calculation.ans) return('complete');
    if(!calculation.num1) return('num1 empty');
    if(calculation.num1 && !calculation.operation) return('num1 incomplete');
    if(calculation.num1 && calculation.operation && !calculation.num2) return('num2 empty');
    if(calculation.operation && calculation.num2) return('num2 incomplete');
}

function clearAll(){
    calculation.num1 = '';
    calculation.operation = '';
    calculation.symbol = '';
    calculation.num2 = '';
    calculation.ans = '';
    mainOperation.textContent = '';
    mainAnswer.textContent = '';
}

function updateDisplay() {
    if(calculation.ans && calculation.operation === 'sqrt'){
        mainOperation.textContent = `${calculation.symbol}${calculation.num1}`;
        mainAnswer.textContent = calculation.ans;
    } else {
        mainOperation.textContent = `${calculation.num1}${calculation.symbol}${calculation.num2}`;
        mainAnswer.textContent = calculation.ans;
    }
    if(calculation.ans){
        mainOperation.textContent += ' =';
    }
}

function processAnswer() {
    const rawAnswer = (calc[calculation.operation](Number(calculation.num1), Number(calculation.num2)).toString());
    const roundedAnswer = checkLength(rawAnswer).toString();
    calculation.ans = roundedAnswer;
    updateDisplay();
    addHistory();
}

function checkLength(number){
    let leftLength = '';
    let rightLength = '';
    if(!number.includes('.')){
      leftLength = number.length;
    } else {
      const array = number.split('.');
      leftLength = array[0].length;
      rightLength = array[1].length;
    }
    if(leftLength > 9 || (number.includes('e') && rightLength > 5)){
      return (Number(number).toExponential(5)).toString();
    }
    if(leftLength + rightLength > 9){
      const precision = 11-leftLength;
      return parseFloat((Number(number).toFixed(precision)).toString())
    }
    return number
  }

// ----- History Button -----

historyButton.addEventListener('click', () => {
    historyList.classList.toggle('history-list-closed');
    historyList.classList.toggle('history-list-open');
})

buttonsContainer.addEventListener('click', () => {
    if(historyList.classList.contains('history-list-open')){
        historyList.classList.toggle('history-list-closed');
        historyList.classList.toggle('history-list-open');
    }
})
// ----- Number Buttons -----

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        const status = getStatus();
        const number = numberButton.textContent;
        if(status === 'complete'){
            clearAll();
            calculation.num1 = number;
        } else if(status === 'num1 empty' || status === 'num1 incomplete'){
            if(calculation.num1.replace('.','').length >= 9) return;
            calculation.num1 += number;
        } else {
            if(calculation.num2.replace('.','').length >= 9) return;
            calculation.num2 += number;
        }
        updateDisplay();
    })
})

decimalButton.addEventListener('click', () => {
    const status = getStatus();

    if(status === 'complete' && calculation.ans.includes('.')) return;
    if(status === 'complete'){
        const answer = calculation.ans;
        clearAll();
        calculation.num1 = `${answer}.`;
    } else if(status === 'num1 empty' || status === 'num1 incomplete'){
        if(calculation.num1.includes('.') || calculation.num1.length >= 9) return;
        if(status === 'num1 empty'){
            calculation.num1 += '0';
        }
        calculation.num1 += '.';
    } else {
        if(calculation.num2.includes('.') || calculation.num2.length >= 9) return;
        if(status === 'num2 empty'){
            calculation.num2 += '0';
        }
        calculation.num2 += '.';
    }
    updateDisplay();
})

// ----- Operation Buttons -----

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        const status = getStatus();
        const operator = operatorButton.dataset.operator;
        const symbol = operatorButton.textContent;

        if(status === 'num1 empty') return;
        if((status === 'num2 incomplete') && operator!='sqrt') return;
        if(status === 'complete' && operator!='sqrt'){
            calculation.num1 = calculation.ans;
            calculation.operation = operator;
            calculation.symbol = symbol;
            calculation.num2 = '';
            calculation.ans = '';
        } else if (operator!='sqrt'){
            if(status === 'num1 empty' || status === 'num1 incomplete'){
                if(calculation.num1.charAt(calculation.num1.length-1)==="."){
                    calculation.num1 += '0';
                }
                calculation.operation = operator;
                calculation.symbol = symbol;
            } else {
                calculation.operation = operator;
                calculation.symbol = symbol;
            }
        } else if (operator === 'sqrt'){
            if(status === 'complete'){
                calculation.num1 = calculation.ans;
                calculation.operation = operator;
                calculation.symbol = symbol;
                calculation.num2 = '1';
                processAnswer();
            } else {
                if(calculation.num1.charAt(calculation.num1.length-1)==="."){
                    calculation.num1 += '0';
                }
                calculation.operation = operator;
                calculation.symbol = symbol;
                calculation.num2 = '1';
                processAnswer();
            }
        }
        updateDisplay();
    })
})

// ----- Delete Buttons -----

allclearButton.addEventListener('click', () => {
    clearAll();
})

backButton.addEventListener('click', () => {
    const status = getStatus();

    if(status === 'num1 empty') return;
    if(status === 'complete'){
        const number = calculation.ans.slice(0, -1);
        clearAll();
        calculation.num1 = number;
    } else if(status === 'num2 empty'){
        calculation.operation = '';
        calculation.symbol = '';
    } else if (status === 'num1 incomplete'){
        calculation.num1 = calculation.num1.slice(0, -1);
    } else {
        calculation.num2 = calculation.num2.slice(0, -1);
    }
    updateDisplay()
})

// ----- Plus Minus Button -----

plusminus.addEventListener('click', () => {
    const status = getStatus();

    if(status === 'complete'){
        const number = (calculation.ans*-1).toString();
        clearAll();
        calculation.num1 = number;
    } else if(status === 'num1 incomplete'){
        calculation.num1 = (calculation.num1*-1).toString();
    } else if(status === 'num2 incomplete'){
        calculation.num2 = (calculation.num2*-1).toString();
    }
    updateDisplay();
})

// ----- Equal Button -----

equalButton.addEventListener('click', () => {
    if(calculation.ans || !calculation.num1 || !calculation.operation || !calculation.num2) return;
    if(calculation.num2.charAt(calculation.num2.length-1)==="."){
        calculation.num2 += '0';
    }
    processAnswer();
})

function addHistory(){
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    const spacer = document.createElement('div');
    spacer.classList.add('spacer');
    const historyOperation = document.createElement('div');
    historyOperation.classList.add('history-operation');
    historyOperation.textContent = mainOperation.textContent;
    const historyAnswer = document.createElement('div');
    historyAnswer.classList.add('history-answer');
    historyAnswer.textContent = mainAnswer.textContent;
    historyAnswer.addEventListener('click', () =>{
        const status = getStatus();
        if(status === 'complete' || status === 'num1 empty'){
            clearAll();
            calculation.num1 = historyAnswer.textContent;
        } else if(status === 'num2 empty'){
            calculation.num2 = historyAnswer.textContent;
        }
        updateDisplay()
        historyList.classList.toggle('history-list-closed');
        historyList.classList.toggle('history-list-open');
    })
    historyItem.appendChild(spacer);
    historyItem.appendChild(historyOperation);
    historyItem.appendChild(historyAnswer);
    historyList.prepend(historyItem)
}
