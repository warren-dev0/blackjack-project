import rules from './rules.html?raw';

export const renderRules = (player) => {

    if(!player) return;

    const rulesDialogHTML = document.createElement('dialog');
    rulesDialogHTML.id = 'rules--dialog';
    rulesDialogHTML.innerHTML = rules;

    document.body.appendChild(rulesDialogHTML);

    const rulesPlayerName = document.querySelector('#rules--dialog header h2 span');

    rulesPlayerName.innerText = player.name;

    const rulesBtnSkip = document.querySelector('#rules__btn--skip');
    const rulesBtnPlay = document.querySelector('#rules__btn--play');

    try {
        rulesBtnPlay
            .addEventListener('click', () => {
                rulesDialogHTML.close();
            });
        rulesBtnSkip
            .addEventListener('click', () => {
                rulesDialogHTML.close();
            });
    } catch (e) {
        console.warn(e);
    }
};