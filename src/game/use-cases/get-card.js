import Storage from '../../storage/app.storage.js';
import { createDeck } from './deck.js';
import { showCard } from "./show-card-taked";
import { Win } from "./winer-loser";

export const getCard = (deck, users) => {

    const getCardBtn = document.querySelector('#getCardBtn');
    const standBtn = document.querySelector('#standBtn');

    const user = users.find(u => u.turn === true);
    const card = deck.pop();
    user.cards.push(card);
    const point = getCardValue(card);
    user.points += point;

    const userBoard = document.getElementById(`${user.id}`);
    const userPoints = userBoard.querySelector('.player--board__points span');

    userPoints.textContent = user.points;

    const playing = Win(user);

    showCard(card);

    Storage.setToStorage('users', users);
    Storage.setToStorage('deck', deck);

    if(playing === 'loser'){
        Storage.setToStorage('users', users);
        Storage.setToStorage('optionsDisabled', true);
        const playAgain = confirm('Perdiste, ¿Quieres jugar de nuevo?')
        if (playAgain){
            newGame(users, deck);
        } else {
            Storage.setToStorage('optionsDisabled', true);
        }
    } else if (playing === 'winner') {
        alert('Tu ganas');
        Storage.setToStorage('optionsDisabled', true);
        window.location.reload();
    }

}

const getCardValue = (card) => {
    const value = isNaN(card.substring(0, card.length - 1))
        ? card.substring(0, card.length - 1) === 'A'
            ? 11
            : 10
        : parseInt(card.substring(0, card.length - 1));
    return value;
}

export const newGame = (users, deck) => {
    users.forEach(user => {
        user.cards = [];
        user.points = 0;
        user.playing = true;
        users[0].turn = false;
        users[1].turn = true;
    })
    deck = createDeck();
    Storage.setToStorage('users', users);
    Storage.setToStorage('deck', deck);
    Storage.setToStorage('optionsDisabled', false);
    window.location.reload();
}