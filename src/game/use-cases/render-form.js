import {formTyping} from './form-typing';

export const renderForm = (element) => {

    const formElement = document.createElement('section');
    formElement.id = 'form--section';
    const label = document.createElement('label');
    label.for = 'name';
    label.className = 'form__label';
    const form = document.createElement('form');
    form.action = '';
    form.className = 'form';
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.minLength = 3;
    input.required = true;
    input.autocomplete = false;
    input.id = 'name';
    input.className = 'form__name';
    input.placeholder = 'tu nombre';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'form__btn';
    button.innerHTML = 'Iniciar';

    form.appendChild(input);
    form.appendChild(button);
    formElement.appendChild(label);
    formElement.appendChild(form);

    element.appendChild(formElement);

    formTyping(label, 'Ingresa tu nombre...')
};







