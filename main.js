const header = document.querySelector('header h1');
const squares = document.querySelectorAll('.square');
const lines = document.querySelectorAll('.line');
const circles = document.querySelectorAll('circle');
const cover = document.querySelector('.cover');

class Circle {
    constructor(circle) {
        this.circle = circle;
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;
        this.circle.style.strokeDasharray = this.circumference;
    }

    setCircumference = (percent) => {
        this.circle.style.strokeDashoffset = this.circumference - (percent / 100) * this.circumference;
    }
}

const fields = Array(9);
let i = 0;

addEventListener('load', () => {
    setTimeout(() => {
        cover.style.display = 'none';
    }, 800)

    circles.forEach(circle => {
        new Circle(circle).setCircumference(0);
    })
})

squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if(i % 2 === 0) {
            [square.firstElementChild, square.firstElementChild.nextElementSibling].forEach(element => element.classList.add('active'));
            fields[index] = 'x';
            header.textContent = 'Player 2: O';
        } else {
            const circle = new Circle(square.lastElementChild.firstElementChild);
            circle.setCircumference(-100);
            fields[index] = 'o';
            header.textContent = 'Player 1: X';
        }
        checkForWinner();
        square.setAttribute('disabled', 'true');
        i++;
    })
})

function checkForWinner() {
    if(fields[0] === 'x' && fields[1] === 'x' && fields[2] === 'x' || fields[0] === 'o' && fields[1] === 'o' && fields[2] === 'o') {
        return gameOver();
    }
    if(fields[3] === 'x' && fields[4] === 'x' && fields[5] === 'x' || fields[3] === 'o' && fields[4] === 'o' && fields[5] === 'o') {
        return gameOver();
    }
    if(fields[6] === 'x' && fields[7] === 'x' && fields[8] === 'x' || fields[6] === 'o' && fields[7] === 'o' && fields[8] === 'o') {
        return gameOver();
    }

    if(fields[0] === 'x' && fields[3] === 'x' && fields[6] === 'x' || fields[0] === 'o' && fields[3] === 'o' && fields[6] === 'o') {
        return gameOver();
    }
    if(fields[1] === 'x' && fields[4] === 'x' && fields[7] === 'x' || fields[1] === 'o' && fields[4] === 'o' && fields[7] === 'o') {
        return gameOver();
    }
    if(fields[2] === 'x' && fields[5] === 'x' && fields[8] === 'x' || fields[2] === 'o' && fields[5] === 'o' && fields[8] === 'o') {
        return gameOver();
    }

    if(fields[0] === 'x' && fields[4] === 'x' && fields[8] === 'x' || fields[0] === 'o' && fields[4] === 'o' && fields[8] === 'o') {
        return gameOver();
    }
    if(fields[2] === 'x' && fields[4] === 'x' && fields[6] === 'x' || fields[2] === 'o' && fields[4] === 'o' && fields[6] === 'o') {
        return gameOver();
    }

    if(!fields.includes(undefined)) {
        alert('Draw');
        location.reload();
    }
}

function gameOver() {
    if(i % 2 === 0) {
        alert('Player 1 won!');
        location.reload();
    } else {
        alert('Player 2 won!');
        location.reload();
    }
}