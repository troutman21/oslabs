//npx rollup --config rollup.config.js
import styles from './Style';

class Form {
  constructor(form, onSubmit) {
    this.fields = [];
    this.submitBtn = form.getElementsByTagName('button')[0];
    this.onSubmit = onSubmit;


    const formInputContainers = form.getElementsByTagName('div');
    Array.prototype.forEach.call(formInputContainers, input => {
      if(input.getElementsByTagName('textarea').length > 0) {
        input.classList.add('form_message')
      } else {
        input.classList.add('form_input')
      }
      this.fields.push(input);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit(e, this.fields, this.onSubmit);
    });

    styles(form);
  }

  submit(e, fields, handleSubmit) {
    this.submitBtn.disabled = true;
    this.submitBtn.innerText = 'Form Submitted, Thanks!';
    this.submitBtn.style.opacity = '0.5';
    this.submitBtn.style.outline = 'none';
    handleSubmit(e, fields);
  }




}

export default Form;
