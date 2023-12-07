export const formTyping = (element, text) => {
    if (!element) return;
    const array = text.split('');

    let i = 0;

    setTimeout(() => {
        setInterval(() => {
            if (i < array.length) {
                element.innerHTML += text[i];
                i++;
            }
        }, 100);
    }, 2000)
}
