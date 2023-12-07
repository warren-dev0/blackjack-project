import { User } from "../game/models/user.model.js";
import "../game/use-cases/index.js";
import {createDeck} from "../game/use-cases/deck";

let users = [];
let game = [0, 0];

const init = () => {
    loadStorage();
}

const loadStorage = () => {
    const data = getFromStorage('users');
    if (!data) {
        addNewUser();
        setToStorage('deck', createDeck());
        setToStorage('rulesshowed', false);
        setToStorage('game', game);
        setToStorage('optionsDisabled', false)
    }
}

const setToStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

const getFromStorage = (key) => {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : null;
}

const addNewUser = (name) => {
    users.push(new User(name));
    try{
        users[1].turn = true;
    } catch(e) {
        console.log('waiting for second player');
    }
    setToStorage('users', users);
}

const setCurrentTurn = (user) => {
    users = getFromStorage('users');
    users.forEach( u => {
        if(u.id === user.id) {
            u.turn = true;
        }else {
            u.turn = false;
        }
    })
    setToStorage('users', users);
}

export default {
    init,
    setToStorage,
    getFromStorage,
    addNewUser,
    setCurrentTurn
}