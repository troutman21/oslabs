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
    `;

  this.styleTag.innerHTML = this.styles;

  document.head.appendChild(this.styleTag);
}


export default style;
