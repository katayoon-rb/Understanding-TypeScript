"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength != null &&
        typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length >= validateInput.minLength;
    }
    if (validateInput.maxLength != null &&
        typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length <= validateInput.maxLength;
    }
    if (validateInput.min != null &&
        typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if (validateInput.max != null &&
        typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value <= validateInput.max;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    const adjDescriptor = {
        configurable: true,
        get() { return descriptor.value.bind(this); }
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElem = document.getElementById('project-list');
        this.hostElem = document.getElementById('app');
        this.elem = document.importNode(this.templateElem.content, true).firstElementChild;
        this.elem.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        this.elem.querySelector('ul').id = `${this.type}-projects-list`;
        this.elem.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostElem.insertAdjacentElement('beforeend', this.elem);
    }
}
class ProjectInput {
    constructor() {
        this.templateElem = document.getElementById('project-input');
        this.hostElem = document.getElementById('app');
        this.elem = document.importNode(this.templateElem.content, true).firstElementChild;
        this.elem.id = 'user-input';
        this.titleInputElem = this.elem.querySelector('#title');
        this.descriptionInputElem = this.elem.querySelector('#description');
        this.peopleInputElem = this.elem.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const titleInput = this.titleInputElem.value;
        const descInput = this.descriptionInputElem.value;
        const peopleInput = this.peopleInputElem.value;
        const titleValidate = { value: titleInput, required: true };
        const desValidate = { value: descInput, required: true, minLength: 5 };
        const peopleValidate = { value: +peopleInput, required: true, min: 1, max: 5 };
        if (!validate(titleValidate) ||
            !validate(desValidate) ||
            !validate(peopleValidate)) {
            alert('Invalid input, Try again.');
            return;
        }
        else {
            return [titleInput, descInput, +peopleInput];
        }
    }
    cleatInputs() {
        this.titleInputElem.value = '';
        this.descriptionInputElem.value = '';
        this.peopleInputElem.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.cleatInputs();
        }
    }
    configure() {
        this.elem.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElem.insertAdjacentElement('afterbegin', this.elem);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map