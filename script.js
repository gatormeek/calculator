let hoverSelector = document.querySelectorAll("button");
let numbers = document.querySelectorAll(".nums");
let operators = document.querySelectorAll(".operators");
let userInput = document.querySelector("#input-window");
let outputWindow = document.querySelector("#output-window");
let clearCurrent = document.querySelector("#clear-current");
let clearAll = document.querySelector("#clear-all");
let backspace = document.querySelector("#backspace");
userArray = [];
outputArray = [];

backspace.addEventListener('click', () => {
    userArray.pop();
    userInput.textContent = userArray.join('');
})

clearAll.addEventListener('click', () => {
    userArray = [];
    outputArray = [];
    userInput.textContent = userArray.join('');
    outputWindow.textContent = '';
})

clearCurrent.addEventListener('click', () => {
    userArray = [];
    userInput.textContent = userArray.join('');
})

operators.forEach(link => {
    link.addEventListener('click', () => {
        userArray.push(` ${link.textContent} `);
        userInput.textContent = userArray.join('');

    })
})

numbers.forEach(link => {
    link.addEventListener('click', () => {
        if(link.textContent === "." & userArray.includes(".")) {
            return;
        }
        userArray.push(link.textContent);
        userInput.textContent = userArray.join('');
    })
})

hoverSelector.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color='white';
        link.style.background='blue';
    });
    link.addEventListener('mouseleave', () => {
        link.style.color='';
        link.style.background='';
    })
})