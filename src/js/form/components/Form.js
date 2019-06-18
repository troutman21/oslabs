//npx rollup --config rollup.config.js
import styles from './Style';

class Form {
  constructor(form, onSubmit) {
    console.log('formNode', form);
    this.fields = [];
    this.onSubmit = onSubmit;

    form.action = 'POST';
    form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit(e, this.fields, this.onSubmit);
    });

    styles(form);
  }

  submit(e, fields, handleSubmit) {
    handleSubmit(e);
  }




}

export default Form;
