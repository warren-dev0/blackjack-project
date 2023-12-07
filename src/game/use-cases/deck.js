import _ from 'underscore'

const deck = [];
const suits = ['H', 'S', 'C', 'D'];
const specials = ['A', 'J', 'Q', 'K'];
let i = 0;

export const createDeck = () => {
    for (i = 2; i <= 10; i++) {
        for (let suit of suits) {
            deck.push(i+suit)
        }
    }
    for (i = 0; i < specials.length; i++) {
        for(let suit of suits) {
            deck.push(specials[i]+suit)
        }
    }

    return _.shuffle(deck);
}