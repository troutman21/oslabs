import form from './form/index';
import drawCanvas from './hero-bg';

const Form = new form(document.querySelector('#industryRequest'), (e, fields) => {
  let formData = {
    subject: 'OsLabs Contact Submission',
  };

  let mailToLink = `mailto:phillip@codesmith.io?subject=${formData.subject}&body=${fields.reduce((acc, input)=> {
    const subject = input.getElementsByTagName('label')[0].textContent;
    const value = !input.getElementsByTagName('textarea').length > 0 ? 
      input.getElementsByTagName('input')[0].value 
      : input.getElementsByTagName('textarea')[0].value;

    acc += `%0A${subject}:%20${value}%0A`;

    return acc;
  }, '')}`;

  window.location.href = mailToLink;
});

drawCanvas();
