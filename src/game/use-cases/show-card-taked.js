import { createCardHTML } from "./card-html";

export const showCard = (card) => {
    const older = document.querySelector('.card--taked--dialog');
    if (older) {
        older.remove();
    }
    const cardHTML = createCardHTML(card);
    const dialog = document.createElement('dialog');
    dialog.classList.add('card--taked--dialog');
    dialog.appendChild(cardHTML);
    document.body.appendChild(dialog);
    dialog.showModal();
    setTimeout(() => {
        dialog.close();
    }, 2000);
}