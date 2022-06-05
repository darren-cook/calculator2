import { calc } from './modules/app'

const historyButton = document.getElementById('history-button');
const historyList = document.getElementById('history-list');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const allclearButton = document.querySelector('.allclear-button');
const clearButton = document.querySelector('.clear-button');
const backButton = document.querySelector('.back-button');
const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');

historyButton.addEventListener('click', () => {
    historyList.classList.toggle('history-list-closed');
    historyList.classList.toggle('history-list-open');
})

numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        console.log(number.textContent);
    })
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log(operator.dataset.operator);
    })
})

allclearButton.addEventListener('click', () => {
    console.log('all clear')
})

clearButton.addEventListener('click', () => {
    console.log('clear')
})

backButton.addEventListener('click', () => {
    console.log('back')
})

decimalButton.addEventListener('click', () => {
    console.log('.')
})

equalButton.addEventListener('click', () => {
    console.log('eval')
})



