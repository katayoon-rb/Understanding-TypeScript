// Validation
interface Validate {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validateInput: Validate) {
  let isValid = true

  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0
  }

  if (
    validateInput.minLength != null &&
    typeof validateInput.value === 'string'
  ) { isValid = isValid && validateInput.value.length >= validateInput.minLength }

  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === 'string'
  ) { isValid = isValid && validateInput.value.length <= validateInput.maxLength }

  if (
    validateInput.min != null &&
    typeof validateInput.value === 'number'
  ) { isValid = isValid && validateInput.value >= validateInput.min }

  if (
    validateInput.max != null &&
    typeof validateInput.value === 'number'
  ) { isValid = isValid && validateInput.value <= validateInput.max }

  return isValid
}


// autobind decorator
function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() { return descriptor.value.bind(this) }
  }
  return adjDescriptor
}


// ProjectList Class
class ProjectList {
  templateElem: HTMLTemplateElement
  hostElem: HTMLDivElement
  elem: HTMLElement


  constructor( private type: 'active' | 'finished' ) {
    this.templateElem = document.getElementById('project-list')! as HTMLTemplateElement
    this.hostElem = document.getElementById('app')! as HTMLDivElement

    this.elem = document.importNode(this.templateElem.content, true).firstElementChild as HTMLElement
    this.elem.id = `${this.type}-projects`

    this.attach()
    this.renderContent()
  }

  private renderContent() {
    this.elem.querySelector('ul')!.id = `${this.type}-projects-list`
    this.elem.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }

  private attach() {
    this.hostElem.insertAdjacentElement('beforeend', this.elem)
  }
}


// ProjectInput Class
class ProjectInput {
  templateElem: HTMLTemplateElement
  hostElem: HTMLDivElement
  elem: HTMLFormElement
  titleInputElem: HTMLInputElement
  descriptionInputElem: HTMLInputElement
  peopleInputElem: HTMLInputElement


  constructor() {
    this.templateElem = document.getElementById('project-input')! as HTMLTemplateElement
    this.hostElem = document.getElementById('app')! as HTMLDivElement

    this.elem = document.importNode( this.templateElem.content, true ).firstElementChild as HTMLFormElement
    this.elem.id = 'user-input'

    this.titleInputElem = this.elem.querySelector('#title') as HTMLInputElement
    this.descriptionInputElem = this.elem.querySelector('#description') as HTMLInputElement
    this.peopleInputElem = this.elem.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attach()
  }

  private gatherUserInput(): [string, string, number] | void {
    const titleInput = this.titleInputElem.value
    const descInput = this.descriptionInputElem.value
    const peopleInput = this.peopleInputElem.value

    const titleValidate: Validate = { value: titleInput, required: true }
    const desValidate: Validate = { value: descInput, required: true, minLength: 5 }
    const peopleValidate: Validate = { value: +peopleInput, required: true, min: 1, max: 5 }

    if (
      !validate(titleValidate) ||
      !validate(desValidate) ||
      !validate(peopleValidate)
    ) {
      alert('Invalid input, Try again.')
      return
    }
    else {
      return [titleInput, descInput, +peopleInput]
    }
  }

  private cleatInputs() {
    this.titleInputElem.value = ''
    this.descriptionInputElem.value = ''
    this.peopleInputElem.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      console.log(title, desc, people)
      this.cleatInputs()
    }
  }

  private configure() {
    this.elem.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElem.insertAdjacentElement('afterbegin', this.elem)
  }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
