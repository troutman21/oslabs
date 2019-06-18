class Input {
  constructor(inputNode) {
    this.label = inputNode.querySelector('label');
    this.input = inputNode.querySelector('input');

    this.active = false;
    this.focus = false;
    this.value = this.input.value;

  }

  init() {
    // add styling classes to label + input node

    // add focus and blur event listeners to input node
    // toggle active to on during focus
    // toggle active to off during blur
  }

  toggleActive() {
    // adds/remove a class that makes the label smaller
  }

  toggleFocus() {
    // adds/remove a class that makes the label and input border bottom gold
  }

  getInputValue() {
    // return the input value as an array ['inputName', value]
  }
}
