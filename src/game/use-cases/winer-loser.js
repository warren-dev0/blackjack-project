import Storage from '../../storage/app.storage.js';

export const Win = (user) => {

    const points = user.points;

    if (points === 21) {
        console.log('blackjack');
        return 'winner';
    }
    else if (points > 21) {
        console.log('you lose');
        return 'loser';
    }
}