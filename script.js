let hoverSelector = document.querySelectorAll("button");
let numbers = document.querySelectorAll(".nums");
let decimal = document.querySelector("#decimal");
let operators = document.querySelectorAll(".operators");
let inputWindow = document.querySelector("#input-window");
let outputWindow = document.querySelector("#output-window");
let clearCurrent = document.querySelector("#clear-current");
let clearAll = document.querySelector("#clear-all");
let backspace = document.querySelector("#backspace");
userArray = [];
outputArray = [];
let currentNumber='';
//1
backspace.addEventListener('click', () => {
    userArray.pop();
    inputWindow.textContent = userArray.join('');
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
    //for each operator button...
    link.addEventListener('click', () => {
        //add an event listener for 'click' event
        if (currentNumber === '' && userArray.length === 0) {
            return;
        }
        //if currentNumber is empty and userArray.length is 0, don't do anything
        //const lastItem = userArray[userArray.length-1];
        //declare lastItem variable as the last item of the userArray
        if (currentNumber !== '') {
            userArray.push(currentNumber);
            currentNumber='';
        }
        if (["+", "-", "*", "÷"].includes(userArray.at(-1))) {
            return;
        }
        //if the last item of userArray includes an operator, don't do anything
        //if currentNumber is not empty, push currentNumber to userArray
        //reset currentNumber to 0
        userArray.push(currentNumber);
        userArray.push(link.textContent);
        //push the textContent of the operator button to userArray
        inputWindow.textContent = userArray.join('');
        //make userArray the textContent of the inputWindow
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