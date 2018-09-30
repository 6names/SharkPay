// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
import {append, createTag, forLoop} from "./helpers";

export const validate = (formEl, callback) => {
    const form = document.querySelector(formEl);
    
    if (form) {
        let i;
        const inputs = form.querySelectorAll('input');
        const textareas = form.querySelectorAll('textarea');
        const selects = form.querySelectorAll('select');
        let re;
        let error;
        
        // Add error message
        const addErrorMessage = (input) => {
            const parent = form.parentElement;
            const messagesHolder = parent.querySelector('.form-errors');
            const messagesList = parent.querySelector('.form-errors__list');
            const message = createTag('input-error');
            if (messagesHolder) {
                message.dataset.id = input.name;
                message.innerText = input.dataset.errorMessage;
                messagesHolder.classList.remove('visually-hidden');
                
                const errors = parent.querySelectorAll('.input-error');
                if (errors.length > 0) {
                    if (!messagesList.contains(parent.querySelector(`[data-id="${input.name}"]`))) append(messagesList, message);
                } else {
                    append(messagesList, message);
                }
            }
        };
        
        // Remove error message
        const removeErrorMessage = (input) => {
            const parent = form.parentElement;
            const messagesHolder = parent.querySelector('.form-errors');
            const errors = parent.querySelectorAll('.input-error');
            if (messagesHolder) {
                forLoop(errors.length, (i) => {
                    if (errors[i].dataset.id === input.name) errors[i].remove();
                });
                
                if (errors.length < 1) {
                    messagesHolder.classList.add('visually-hidden');
                }
            }
        };
        
        const checkSelects = () => {
            forLoop(selects.length, (i) => {
                const select = selects[i];
                if (select.value === 'empty') {
                    select.classList.add('error');
                    addErrorMessage(select);
                } else {
                    select.classList.remove('error');
                    removeErrorMessage(select);
                }
            });
        };
        
        // Inputs
        const checkInputs = (input) => {
            if (input.dataset.required === 'required') {
                const name = input.getAttribute('name');
                const type = input.getAttribute('type');
                error = input.dataset.errorMessage;
                
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else if (type === 'radio') {
                    const groupName = input.getAttribute('name');
                    const group = document.querySelectorAll(`[name=${groupName}"]`);
                    
                    for (let i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
                    
                    if (i === group.length) {
                        forLoop(group.length, (i) => {
                            const item = group[i];
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                        });
                    } else {
                        forLoop(group.length, (i) => {
                            const item = group[i];
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                        });
                    }
                } else {
                    if (name) {
                        const randomInput = () => {
                            if (input.value === '') {
                                input.classList.add('error');
                                if (error) {
                                    addErrorMessage(input);
                                }
                            } else {
                                input.classList.remove('error');
                                removeErrorMessage(input);
                            }
                        };
                        
                        const patternInput = () => {
                            if (!re.test(input.value)) {
                                input.classList.add('error');
                                if (error) {
                                    addErrorMessage(input);
                                }
                            } else {
                                input.classList.remove('error');
                                removeErrorMessage(input);
                            }
                        };
                        
                        switch (name) {
                            case 'name':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'firstName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'lastName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'thirdName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'email':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'mail':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'phone':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            
                            default:
                                randomInput();
                        }
                    }
                }
            }
        };
        
        // Selects
        forLoop(selects.length, (i) => {
            const select = selects[i];
            select.addEventListener('change', () => {
                if (select.value === 'empty') {
                    select.classList.add('error');
                    addErrorMessage(select);
                } else {
                    select.classList.remove('error');
                    removeErrorMessage(select)
                }
            });
        });
        
        // Inputs listeners
        forLoop(inputs.length, (i) => {
            const type = inputs[i].getAttribute('type');
            const input = inputs[i];
            if (type === 'checkbox' || type === 'radio') {
                input.addEventListener('change', function () {
                    checkInputs(this);
                });
            } else {
                input.addEventListener('blur', function () {
                    checkInputs(this);
                });
                input.addEventListener('keyup', function () {
                    checkInputs(this);
                });
            }
        });
        
        // Textarea
        forLoop(textareas.length, (i) => {
            const textarea = textareas[i];
            textarea.addEventListener('blur', function () {
                checkInputs(this);
            });
        });
        
        // Submit listener
        form.addEventListener('submit', function (e) {
            forLoop(inputs.length, (i) => {
                checkInputs(inputs[i]);
            });
            
            forLoop(textareas.length, (i) => {
                checkInputs(textareas[i]);
            });
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if (callback) {
                    callback(e);
                }
            }
        });
    }
};
