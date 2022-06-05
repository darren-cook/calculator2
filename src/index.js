import { calc } from './modules/app'

const historyButton = document.getElementById('history-button');
const historyList = document.getElementById('history-list');

historyButton.addEventListener('click', () => {
    console.log('test')
    historyList.classList.toggle('history-list-closed');
    historyList.classList.toggle('history-list-open')
})