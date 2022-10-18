var game = document.querySelector(".game");
var basket = document.querySelector(".basket");
var elements = document.querySelector(".elements");
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var baskeBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));
const values = ["c", "h", "o", "n"];
const compounds = [
    {text: "H2O", value: "hho"},
    {text: "C3H402", value: "ccchhhhoo"}
];
const colorClasses = {
    c: "purple",
    h: "purple",
    n: "blue",
    o: "blue"
}
var currentCompound = 0;
var score = 0;

function moveBasketLeft(){
    if (basketLeft > 0) {
        basketLeft -= 15;
        basket.style.left = basketLeft + 'px';
    }

}

function moveBasketRight(){
    if (basketLeft < 0) {
        basketLeft += 15;
     basket.style.left = basketLeft + 'px';

    }
    basketLeft += 15;
    basket.style.left = basketLeft + 'px';

}

function control(e){
    if (e.key == "ArrowLeft") {
        moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
        moveBasketRight();
    }
}

function generateElements() {
    const bottomLimit = 1500;
    var elementBottom = 1050;
    var elementLeft = Math.floor(Math.random() * game.clientWidth);
    var element = document.createElement('div');
    const value = values[Math.floor(Math.random() * values.length)];
    element.innerText = value;
    element.classList.add("element", colorClasses[value]);
    elements.appendChild(element);
    var fallInterval = setInterval(fallDownElement, 20)

    function fallDownElement(){
        //Jugador agarra elemento
        if (elementBottom < baskeBottom + 50 && elementBottom > baskeBottom && elementLeft > basketLeft - 30 && elementLeft < basketLeft + 80){
            elements.removeChild(element);
            clearInterval(fallInterval);
        }

        elementBottom -= 5;
        element.style.bottom = elementBottom + 'px';
        element.style.left = elementLeft + 'px';

        if(element.getBoundingClientRect().top > bottomLimit) {
            elements.removeChild(element);
            clearInterval(fallInterval);
        }
    }

    element.style.bottom = elementBottom + 'px';
    setTimeout(generateElements, 500)
}
generateElements();

document.addEventListener("keydown", control);