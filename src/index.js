import { calc, checkExponential } from './modules/app';

const historyButton = document.getElementById('history-button');
const historyList = document.getElementById('history-list');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const allclearButton = document.querySelector('.allclear-button');
const clearButton = document.querySelector('.clear-button');
const backButton = document.querySelector('.back-button');
const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');
const mainOperation = document.getElementById('main-operation');
const mainAnswer = document.getElementById('main-answer');

const calculation = {
    num1: '',
    operation: '',
    num2: '',
    ans: '',
}

// ----- History Button -----

historyButton.addEventListener('click', () => {
    historyList.classList.toggle('history-list-closed');
    historyList.classList.toggle('history-list-open');
})


// ----- Number Buttons -----

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        const number = numberButton.textContent;
        if(calculation.ans){
            calculation.num1 = '';
            calculation.operation = '';
            calculation.num2 = '';
            calculation.ans = '';
            mainOperation.textContent = '';
            mainAnswer.textContent = '';
            return;
        }
        if(!calculation.operation){
            calculation.num1 += number;
            mainOperation.textContent += number;
        } else {
            calculation.num2 += number;
            mainOperation.textContent += number;
        }
    })
})

decimalButton.addEventListener('click', () => {
    if(calculation.ans && calculation.ans.indexOf('.')==-1){
        calculation.num1 = `${calculation.ans}.`;
        calculation.operation = '';
        calculation.num2 = '';
        calculation.ans = '';
        mainOperation.textContent = calculation.num1;
        mainAnswer.textContent = '';
        return;
    }
    if(calculation.ans) return;
    if(!calculation.operation){
        if(calculation.num1.indexOf('.')!=-1) return;
        if(!calculation.num1){
            calculation.num1 += '0';
            mainOperation.textContent += '0';
        }
        calculation.num1 += '.';
        mainOperation.textContent += '.';
    } else {
        if(!calculation.num2){
            calculation.num2 += '0';
            mainOperation.textContent += '0';
        }
        if(calculation.num2.indexOf('.')!=-1) return;
        calculation.num2 += '.';
        mainOperation.textContent += '.';
    }
})

// ----- Operation Buttons -----

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        const operator = operatorButton.dataset.operator;
        const symbol = operatorButton.textContent;
        if(!calculation.num1) return;
        if(calculation.ans && operator!='sqrt'){
            calculation.num1 = calculation.ans;
            calculation.operation = operator;
            calculation.num2 = '';
            calculation.ans = '';
            mainOperation.textContent = `${calculation.num1} ${symbol} `;
            mainAnswer.textContent = '';
            return;
        }
        if((calculation.operation && calculation.num2) && operator!='sqrt') return;
        if(operator === 'sqrt'){
            if(calculation.ans){
                calculation.num1 = calculation.ans;
                calculation.operation = operator;
                calculation.num2 = '1';
                const answer = (calc[calculation.operation](Number(calculation.num1), Number(calculation.num2)).toString());
                const finalAnswer = checkExponential(answer);
                calculation.ans = finalAnswer;
                mainOperation.textContent = `${symbol} ${calculation.num1}`;
                mainAnswer.textContent = finalAnswer;
                return;
            } else {
                calculation.operation = operator;
                calculation.num2 = '1';
                const answer = (calc[calculation.operation](Number(calculation.num1), Number(calculation.num2)).toString());
                const finalAnswer = checkExponential(answer);
                calculation.ans = finalAnswer;
                mainOperation.textContent = `${symbol} ${calculation.num1}`;
                mainAnswer.textContent = finalAnswer;
                return;
            }
        } else if (!calculation.operation) {
            calculation.operation = operator;
            mainOperation.textContent += ` ${symbol} `;
        } else {
            calculation.operation = operator;
            mainOperation.textContent = mainOperation.textContent.slice(0, -3);
            mainOperation.textContent += ` ${symbol} `;
        }
    })
})

// ----- Delete Buttons -----

allclearButton.addEventListener('click', () => {
    calculation.num1 = '';
    calculation.operation = '';
    calculation.num2 = '';
    calculation.ans = '';
    mainOperation.textContent = '';
    mainAnswer.textContent = '';
})

clearButton.addEventListener('click', () => {
    if(calculation.ans){
        calculation.num1 = '';
        calculation.operation = '';
        calculation.num2 = '';
        calculation.ans = '';
        mainOperation.textContent = '';
        mainAnswer.textContent = '';
        return;
    }
    if(!calculation.operation || (calculation.operation && !calculation.num2)){
        calculation.num1 = '';
        calculation.operation = ''
        mainOperation.textContent = '';
    } else {
        const num2Length = calculation.num2.length;
        calculation.num2 = '';
        if(calculation.operation){
            mainOperation.textContent = mainOperation.textContent.slice(0, -num2Length);
        } else {
            mainOperation.textContent = calculation.num1;
        }
    }
})

backButton.addEventListener('click', () => {
    if(calculation.ans){
        calculation.num1 = calculation.ans.slice(0, -1);
        calculation.operation = '';
        calculation.num2 = '';
        calculation.ans = '';
        mainOperation.textContent = calculation.num1;
        mainAnswer.textContent = '';
        return;
    }
    if(calculation.operation && !calculation.num2){
        calculation.operation = '';
        mainOperation.textContent = calculation.num1;
        return
    }
    if(!calculation.operation){
        calculation.num1 = calculation.num1.slice(0, -1);
        mainOperation.textContent = mainOperation.textContent.slice(0, -1);
    } else {
        calculation.num2 = calculation.num2.slice(0, -1);
        mainOperation.textContent = mainOperation.textContent.slice(0, -1);
    }
})

// ----- Equal Button -----

equalButton.addEventListener('click', () => {
    if(!calculation.num1 || !calculation.operation || !calculation.num2) return;
    const answer = (calc[calculation.operation](Number(calculation.num1), Number(calculation.num2)).toString());
    const finalAnswer = checkExponential(answer);
    calculation.ans = finalAnswer;
    mainOperation.textContent += "  =";
    mainAnswer.textContent = finalAnswer;
    // store in history
})



