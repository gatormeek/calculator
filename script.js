let hoverSelector = document.querySelectorAll("button");
let numbers = document.querySelectorAll(".nums");
let decimal = document.querySelector("#decimal");
let operators = document.querySelectorAll(".operators");
let inputWindow = document.querySelector("#input-window");
let outputWindow = document.querySelector("#output-window");
let clearCurrent = document.querySelector("#clear-current");
let clearAll = document.querySelector("#clear-all");
let backspace = document.querySelector("#backspace");
let parentheses = document.querySelector("#parentheses");
let squared = document.querySelector("#squared");
let squareRoot = document.querySelector("#square-root");
userArray = [];
outputArray = [];
let currentNumber='';
//1
backspace.addEventListener('click', () => {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    } 
    else if (userArray.length > 0) {
        let lastItem = userArray.pop();
        if (lastItem.length > 1 && !['+', '-', '*', '÷', '(', ')'].includes(lastItem)) {
            currentNumber = lastItem.slice(0, -1);
        }
    }
    inputWindow.textContent = userArray.join('') + currentNumber;
})
//2
clearAll.addEventListener('click', () => {
    userArray = [];
    outputArray = [];
    currentNumber='';
    inputWindow.textContent = userArray.join('');
    outputWindow.textContent = '';
})
//3
clearCurrent.addEventListener('click', () => {
    userArray = [];
    currentNumber='';
    inputWindow.textContent = userArray.join('');
})
//4
operators.forEach(link => {
    link.addEventListener('click', () => {
        if (currentNumber === '' && userArray.length === 0) {
            return;
        }
        if (currentNumber !== '') {
            userArray.push(currentNumber);
            currentNumber='';
        }
        if (["+", "-", "*", "÷", "("].includes(userArray.at(-1))) {
            return;
        }
        userArray.push(link.textContent);
        inputWindow.textContent = userArray.join('');
    });
});
//5
decimal.addEventListener('click', () => {
    if(currentNumber.slice(-1) === '²') {
        return;
    }
    if(currentNumber.includes(".")) {
            return;
        }
    currentNumber += '.';
    inputWindow.textContent = userArray.join('') + currentNumber;
})
//6
numbers.forEach(link => {
    link.addEventListener('click', () => {
        if (currentNumber.slice(-1)  === '²') {
            return;
        }
        currentNumber += link.textContent;
        inputWindow.textContent = userArray.join('') + currentNumber;
    })
})
//7
parentheses.addEventListener('click', () => {
    let openCount = (userArray.join('') + currentNumber).split('(').length - 1;
    let closeCount = (userArray.join('') + currentNumber).split(')').length - 1;
    let lastChar = userArray.at(-1);

    if (openCount === closeCount || lastChar === ')') {
        if (lastChar === '(') {
            return;
        }
        if (currentNumber !== '') {
            userArray.push(currentNumber);
            currentNumber = '';
        }
        userArray.push('(');
    } else {
        if ((currentNumber !== '' && !isNaN(currentNumber)) || lastChar === ')') {
            if (currentNumber !== '') {
                userArray.push(currentNumber);
                currentNumber = '';
            }
            userArray.push(')');
        }
    }
    inputWindow.textContent = userArray.join('') + currentNumber;
})
//8 need to prevent square after operator
squared.addEventListener('click', () => {
    if (["%", "*", "÷", "+", "-"].includes(userArray.at(-1))) {
        return;
    }
    if (currentNumber.slice(-1) === "²" || currentNumber.slice(-1) === "√") {
        return;
    } else {
        currentNumber += '²';
        inputWindow.textContent = userArray.join('') + currentNumber;
    }
})
//9
squareRoot.addEventListener('click', () => {
    if (currentNumber.slice(-1) === '√' && !["+", "-", "*", "÷", "("].includes(userArray.at(-1))) {
        return;
    }
    currentNumber += '√';
    inputWindow.textContent = userArray.join('') + currentNumber;
})
//10
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