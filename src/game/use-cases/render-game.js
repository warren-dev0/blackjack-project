import game from '../game.html?raw';
import Storage from '../../storage/app.storage.js';
import { createCardHTML } from './card-html.js';

const createTitleAndSpan = (title, span) => {
    const h4Element = document.createElement('h4');
    h4Element.textContent = title;
    const spanElement = document.createElement('span');
    spanElement.textContent = span;
    return [h4Element, spanElement];
}

export const renderGame = (app, users) => {

    try{
        const oldElement = document.querySelector('.game__container');
        oldElement.remove();
    }catch(e) {}

    const gameContainer = document.createElement('section');

    gameContainer.classList.add('game__container');
    gameContainer.innerHTML = game;

    app.appendChild(gameContainer);

    const containerBoards = document.querySelector('.container__boards');

    users.forEach(user => {
        const article = document.createElement('article');

        article.classList.add('container__player--board');
        article.setAttribute('id', user.id);

        const playerDiv = document.createElement('div');

        playerDiv.classList.add('player--board__name');
        const [playerTitle, playerName] = createTitleAndSpan('Jugador', user.name);
        playerDiv.appendChild(playerTitle);
        playerDiv.appendChild(playerName);

        const scoreDiv = document.createElement('div');

        scoreDiv.classList.add('player--board__points');
        const [scoreTitle, score] = createTitleAndSpan('Puntos', user.points);
        scoreDiv.appendChild(scoreTitle);
        scoreDiv.appendChild(score);

        const cardsDiv = document.createElement('div');

        cardsDiv.classList.add('player--board__cards');
        const cardsTitle = document.createElement('h4');
        cardsTitle.textContent = 'Cartas';
        const cardsShow = document.createElement('a');
        cardsShow.setAttribute('player', user.id)
        cardsShow.classList.add('cards--dialog__open--btn');
        cardsShow.textContent = 'Ver cartas';
        cardsDiv.appendChild(cardsTitle);
        cardsDiv.appendChild(cardsShow);

        article.appendChild(playerDiv);
        article.appendChild(scoreDiv);
        article.appendChild(cardsDiv);

        containerBoards.appendChild(article);

        const boardCurrentTurn = document.querySelector('.table__current--turn h2');
        if(user.turn) {
            boardCurrentTurn.textContent = `Turno de: ${user.name}`;
        }
    });

    const cardsDialog = document.createElement('dialog');
    cardsDialog.id = 'cards--dialog';
    cardsDialog.classList.add('board__cards--dialog');
    cardsDialog.innerHTML =
        `   
    <header>
        <button id="cards--dialog__close--btn">X</button>
        <div class="cards--dialog__title">
        </div>
    </header>
    <div class="cards--dialog__cards">
    </div>
    
    `;

    containerBoards.appendChild(cardsDialog);
    showDialogCards();
}

const showDialogCards = () => {
    const cardsDialogCloseBtn = document.querySelector('#cards--dialog__close--btn');
    const cardsDialog = document.querySelector('#cards--dialog');
    const cardsDialogTitle = document.querySelector('.cards--dialog__title');
    const cardsDialogCards = document.querySelector('.cards--dialog__cards');
    const cardsDialogOpenBtn = document.querySelectorAll('.cards--dialog__open--btn');

    cardsDialogOpenBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const player = btn.getAttribute('player');
            const users = Storage.getFromStorage('users');
            const user = users.find(u => u.id === player);
            const cards = user.cards;
            const name = user.name;
            const points = user.points;

            const h4 = document.createElement('h4');
            h4.textContent = `Cartas de ${name}`;

            const h5 = document.createElement('h5');
            h5.textContent = `Puntos: ${points}`;

            cardsDialogTitle.innerHTML = '';

            cardsDialogTitle.appendChild(h4);
            cardsDialogTitle.appendChild(h5);

            cardsDialogCards.innerHTML = '';

            cards.forEach(card => {
                const element = createCardHTML(card);
                cardsDialogCards.appendChild(element);
            })

            cardsDialog.showModal();
        })
    });

    try {
        cardsDialogCloseBtn.addEventListener('click', () => {
            cardsDialog.close();
        });
    } catch (e) {
        console.warn(e);
    }
}