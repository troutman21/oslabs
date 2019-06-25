function style(mountNode) {
  this.styleTag = document.createElement('style');
  this.mountNodeId = mountNode.id;

  this.styles = `
      #${this.mountNodeId} {
        position: relative;
        max-width: 31rem;
        width: 100%;
        padding: 2.5rem 2.5rem 3.75rem;
        background-color: #1d3250;
        box-shadow: 0 0 14px 5px rgba(0,0,0, 0.4);
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
        grid-row-gap: 1.75rem;
      }
      
      @media screen and (max-width: 67rem) {
        #${this.mountNodeId} {
          display: block;
          padding: 1.25rem 1.25rem 5rem;
        }
      }
      
      #${this.mountNodeId} legend {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
          left: -99289px;
        }
    
    
       #${this.mountNodeId} .form_input,
       #${this.mountNodeId} .form_message {
           display: flex;
           flex-direction: column;
       }
       
       @media screen and (max-width: 67rem) {
        .form_input + .form_input,
        .form_input + .form_message {
          margin-top: 1.875rem;
        }
      }
       
       #${this.mountNodeId} .form_input > label,
       #${this.mountNodeId} .form_message > label {
           margin-bottom: 0.625rem;
           font-size: 1.1875rem;
           text-transform: uppercase;
           font-weight: 700;
           color: #ffffff;
       }
    
       #${this.mountNodeId} .form_input > input,
       #${this.mountNodeId} .form_message > textarea {
           background-color: transparent;
           color: #ffffff;
           font-size: 0.9375rem;
       }
    
        #${this.mountNodeId} .form_input > input {
            border: none;
            border-bottom: 2px solid #ffffff;
        }
    
        #${this.mountNodeId} .form_message {
            grid-column-start: 1;
            grid-column-end: 3;
            margin-bottom: 2.5rem;
        }
        
        #${this.mountNodeId} .form_message > textarea {
            border: 2px solid #ffffff;
        }
    
        #${this.mountNodeId} .form_btn {
            position: absolute;
            left: 50%;
            bottom: 2.5rem;
            transform: translateX(-50%);
            font-weight: 600;
            padding: 0.6875rem 0.625rem 0.75rem;
            
        }
        
        #${this.mountNodeId} .form_btn:hover:disabled,
        #${this.mountNodeId} .form_btn:focus:disabled {
          pointer-events: none;
          outline: none;
        }
    `;

  this.styleTag.innerHTML = this.styles;

  document.head.appendChild(this.styleTag);
}

//npx rollup --config rollup.config.js

class Form {
  constructor(form, onSubmit) {
    this.fields = [];
    this.submitBtn = form.getElementsByTagName('button')[0];
    this.onSubmit = onSubmit;


    const formInputContainers = form.getElementsByTagName('div');
    Array.prototype.forEach.call(formInputContainers, input => {
      if(input.getElementsByTagName('textarea').length > 0) {
        input.classList.add('form_message');
      } else {
        input.classList.add('form_input');
      }
      this.fields.push(input);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit(e, this.fields, this.onSubmit);
    });

    style(form);
  }

  submit(e, fields, handleSubmit) {
    this.submitBtn.disabled = true;
    this.submitBtn.innerText = 'Form Submitted, Thanks!';
    this.submitBtn.style.opacity = '0.5';
    this.submitBtn.style.outline = 'none';
    handleSubmit(e, fields);
  }




}

const Form$1 = new Form(document.querySelector('#industryRequest'), (e, fields) => {
  console.log('Form Fam', e);
  console.log('Form Fam', fields);

  let formData = {
    subject: 'OsLabs Contact Submission',
  };

  let mailToLink = `mailto:?subject=${formData.subject}&body=${fields.reduce((acc, input)=> {
    const subject = input.getElementsByTagName('label')[0].textContent;
    const value = !input.getElementsByTagName('textarea').length > 0 ? 
      input.getElementsByTagName('input')[0].value 
      : input.getElementsByTagName('textarea')[0].value;

    acc += `%0A${subject}:%20${value}%0A`;

    return acc;
  }, '')}`;

  console.log(mailToLink);
  window.location.href = mailToLink;
});
