const cards = document.querySelectorAll('.card');
const restartBtn = document.querySelectorAll('.restart')[0];
const modal = document.querySelectorAll('.sweetalert')[0];
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; //trocar tabuleiro//

//função para virar carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        checkforwinner();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 18);
        debugger
        card.style.order = ramdomPosition;
    })
}
shuffle();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//funçao que reinicia o jogo 
function restart() {
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    resetBoard();
    setTimeout(() => {
        shuffle();
        modal.classList.add('esconde')
    }, 1000);
}

//adiciona evento de clique no botao jogar novamente
restartBtn.addEventListener('click', restart);

function checkforwinner() {
    let a = [...cards].filter((card) => card.classList.contains("flip"))
    if(a.length == cards.length){
        modal.classList.remove('esconde')
    }
}