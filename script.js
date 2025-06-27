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
userArray = [];
outputArray = [];
let currentNumber='';
//1
backspace.addEventListener('click', () => {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    } else if (userArray.length > 0) {
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
        if (["+", "-", "*", "÷"].includes(userArray.at(-1))) {
            return;
        }
        userArray.push(currentNumber);
        userArray.push(link.textContent);
        inputWindow.textContent = userArray.join('');
    });
});
//5
decimal.addEventListener('click', () => {
    if(currentNumber.includes(".")) {
            return;
        }
    currentNumber += '.';
    inputWindow.textContent = userArray.join('') + currentNumber;
})
//6
numbers.forEach(link => {
    link.addEventListener('click', () => {
        currentNumber += link.textContent;
        inputWindow.textContent = userArray.join('') + currentNumber;
    })
})
//7
parentheses.addEventListener('click', () => {
    let parenthesesStart = '(';
    let parenthesesEnd = ')';
    if (!inputWindow.textContent.includes(parenthesesStart) && !inputWindow.textContent.includes(parenthesesEnd)) {
        userArray.push(parenthesesStart);
        inputWindow.textContent = userArray.join('');
    } else if (inputWindow.textContent.includes(parenthesesStart) && !inputWindow.textContent.includes(parenthesesEnd)) {
        currentNumber = currentNumber + parenthesesEnd
        inputWindow.textContent = userArray.join('') + currentNumber;
    } else if (inputWindow.textContent.lastIndexOf('(') < inputWindow.textContent.lastIndexOf(')')) {
        userArray.push(parenthesesStart);
        inputWindow.textContent = userArray.join('');
    }
})
//8
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