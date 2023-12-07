import Storage from '../../storage/app.storage.js';
import { renderGame } from './render-game.js';
import { Win } from "./winer-loser";

export const crupierTurn = (deck, users) => {

    const player = users.find(u => u.turn === false);
    const playerPoints = player.points;

    const user = users.find(u => u.turn === true);
    renderGame(document.querySelector('#game'), users);
    while(user.points < playerPoints && user.points < 21) {
        const card = deck.pop();
        user.cards.push(card);
        const point = getCardValue(card);
        user.points += point;

        const userBoard = document.getElementById(`${user.id}`);
        const userPoints = userBoard.querySelector('.player--board__points span');

        userPoints.textContent = user.points;

        Storage.setToStorage('users', users);
        Storage.setToStorage('deck', deck);
    }

    if(user.points > playerPoints && user.points < 21){
        alert('La computadora gana');
    } else if (user.points === 21) {
        alert('La computadora gana');
    }else if(user.points === playerPoints){
        alert('Empate');
    } else if (user.points > 21){
        alert('Tu ganas');
    }

    Storage.setToStorage('optionsDisabled', true);
    window.location.reload();
};

const getCardValue = (card) => {
    const value = isNaN(card.substring(0, card.length - 1))
        ? card.substring(0, card.length - 1) === 'A'
            ? 11
            : 10
        : parseInt(card.substring(0, card.length - 1));
    return value;
}