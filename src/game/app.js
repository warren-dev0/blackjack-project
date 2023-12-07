import Storage from '../storage/app.storage.js';
import { renderGame, renderForm, renderRules, getCard, createCardHTML, showCard, createDeck } from './use-cases';
import { crupierTurn } from './use-cases/crupier-turn.js';
import { newGame } from './use-cases/get-card.js';


export const App = (id) => {
    const gameElement = document.querySelector(id);
    const body = document.querySelector('body');
    let users = Storage.getFromStorage('users');
    let deck = Storage.getFromStorage('deck');

    const loadForm = () => {
        if (users.length < 2) {
            renderForm(body);
            getUserName();
        }
    }

    const loadRules = () => {
        if (users.length > 1) {
            try {
                renderRules(users[1]);
            } catch (e) {
                console.log(e);
            }
        }
    }



    const loadOptions = () => {
        const getCardBtn = document.querySelector('#getCardBtn');
        const standBtn = document.querySelector('#standBtn');
        const newGameBtn = document.querySelector('#newGameBtn');
        const liveGameBtn = document.querySelector('#liveGameBtn');

        if (Storage.getFromStorage('optionsDisabled')) {
            getCardBtn.classList.add('disabled');
            standBtn.classList.add('disabled');
        } else {
            getCardBtn.addEventListener('click', () => {
                getCard(deck, users);
            });

            standBtn.addEventListener('click', () => {
                getCardBtn.setAttribute('disabled', true);
                standBtn.setAttribute('disabled', true);
                users[0].turn = true;
                users[1].turn = false;
                crupierTurn(deck, users);
                Storage.setToStorage('users', users);
            });
        }

        newGameBtn.addEventListener('click', () => { newGame(users, deck) });

        liveGameBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.reload();
        });


    }

    const loadGame = () => {
        if (users.length > 1) {
            renderGame(gameElement, users);
            loadOptions();


            if (Storage.getFromStorage('rulesshowed') === false) {
                Storage.setToStorage('rulesshowed', true);
                const rules = document.querySelector('#rules--dialog');
                setTimeout(() => {
                    rules.showModal();
                }, 1500);
            }
        }
    }

    const getUserName = () => {
        const formBtn = document.querySelector('.form__btn');
        let formName = '';

        if (!formBtn) return;

        formBtn.addEventListener('click', () => {
            formName = document.querySelector('.form__name').value;
            if (formName.length > 3) {
                Storage.addNewUser(formName);
                window.location.reload();
            }
        });
    };


    (() => {
        loadForm();
        loadRules();
        loadGame();
    })();

}