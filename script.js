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
let equals = document.querySelector("#equals")
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
        if (userArray.length === 0 && currentNumber.length === 0 && outputWindow.textContent !== '') {
            userArray.push(outputWindow.textContent);
        }
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
    if (userArray.at(-1) === ')') {
        return;
    }
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
        if (userArray.at(-1) === ')') {
            return;
        }
        if (currentNumber.slice(-1)  === '²') {
            return;
        }
        currentNumber += link.textContent;
        inputWindow.textContent = userArray.join('') + currentNumber;
    })
})
//7 prevent opening parentheses if no operator, unless userArray.length === 0, prevent a number after closing parentheses if no operator
parentheses.addEventListener('click', () => {
    let openCount = (userArray.join('') + currentNumber).split('(').length - 1;
    let closeCount = (userArray.join('') + currentNumber).split(')').length - 1;
    let lastChar = userArray.at(-1);
    //'(' logic
    if (currentNumber !== '') {
            userArray.push(currentNumber)
                currentNumber = '';
            }
    if ((userArray.length === 0 && currentNumber.length === 0) || (openCount === closeCount && ['+', '-', '*', '÷', '√'].includes(userArray.at(-1)))) {
        userArray.push('(');
        inputWindow.textContent = userArray.join('') + currentNumber;
        return;
    } else if (userArray.length !== 0 && openCount > closeCount && !['+', '-', '*', '÷', '√', '('].includes(userArray.at(-1))) {
        userArray.push(')');
        inputWindow.textContent = userArray.join('') + currentNumber;
        return;
        } else {
        return;
    }
})
//8 need to prevent square after operator
squared.addEventListener('click', () => {
    if (userArray.length === 0 && currentNumber.length === 0 && outputWindow.textContent !== '') {
            userArray.push(outputWindow.textContent);
            userArray.push('²');
            inputWindow.textContent = userArray.join('') + currentNumber;
        }
    if (userArray.at(-1) === ')') {
        currentNumber += '²';
        userArray.push(currentNumber);
        currentNumber = '';
        inputWindow.textContent = userArray.join('') + currentNumber;
    } else if (currentNumber === '' || 
        currentNumber.slice(-1) === '²' || 
        currentNumber.slice(-1) === '√' ||
        currentNumber.slice(-1) === '(') {
        return;
    } else {
        currentNumber += '²';
        inputWindow.textContent = userArray.join('') + currentNumber;
    }
})
//9
squareRoot.addEventListener('click', () => {
    if (userArray.length === 0 && currentNumber.length === 0 && outputWindow.textContent !== '') {
            userArray.push('√(');
            userArray.push(outputWindow.textContent);
            inputWindow.textContent = userArray.join('') + currentNumber;
            return;
        }
    if (currentNumber !== '' || userArray.at(-1) === ')') {
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
//11
equals.addEventListener('click', () => {
    let expr = inputWindow.textContent;
    expr = expr.replace(/√\(([^)]+)\)/g, '(($1)**0.5)');
    expr = expr.replace(/√(\d+(\.\d+)?)/g, '($1**0.5)');
    expr = expr.replace(/(\([^\(\)]+\))²/g, '($1**2)');
    expr = expr.replace(/(\d+)²/g, '($1**2)');
    expr = expr.replace(/÷/g, '/');
    let result = eval(expr);
    outputWindow.textContent = result;
    userArray = [];
    currentNumber = '';
})