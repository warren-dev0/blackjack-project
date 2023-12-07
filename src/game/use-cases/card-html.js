export const createCardHTML = (card) => {
    const cardHTML = document.createElement('img');
    cardHTML.classList.add('card');
    cardHTML.setAttribute('src', `./cards/${card}.png`);
    cardHTML.setAttribute('alt', `${card}`);
    return cardHTML;
};