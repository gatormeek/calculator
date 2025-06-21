let hoverSelector = document.querySelectorAll("button");
let numbers = document.querySelectorAll(".white-bg");
let userInput = document.querySelector("#input-window");
userArray = [];
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