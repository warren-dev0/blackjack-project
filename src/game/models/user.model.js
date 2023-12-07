import { v4 as uuidv4 } from 'uuid';

export class User {

    /**
     * 
     * @param {string} name 
     */

    constructor(name = 'Crupier') {
        this.id = uuidv4();
        this.name = name;
        this.turn = false;
        this.cards = [];
        this.points = 0;
        this.playing = true;
    }
}