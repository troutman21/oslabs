import form from './form/index';

const Form = new form(document.querySelector('#industryRequest'), e => {
  console.log('Form Fam');
});

console.log('hello');
