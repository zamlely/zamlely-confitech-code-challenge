import React, { useState, createRef } from 'react';
import styles from '../styles/Registration.module.scss';

export default function RegisterForm() {
  const validationState = [];
  const checkedClassName = styles['hint--checked'];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationStatus, setValidationStatus] = useState('Form is not valid')
  
  const passwordLengthHint = createRef();
  const passwordLowercaseHint = createRef();
  const passwordUppercaseHint = createRef();
  const passwordNumberHint = createRef();
  const passwordSpecialCharacterHint = createRef();
  
  const hintRefs = [
    passwordLengthHint,
    passwordLowercaseHint,
    passwordUppercaseHint,
    passwordNumberHint,
    passwordSpecialCharacterHint
  ];
  
  const hintMessages = [
    '8+ characters',
    'lowercase letter',
    'uppercase letter',
    'number',
    'special character'
  ];

  const hintItems = hintMessages.map((message,index) => (
    <li key={ index } className={ `${styles.hint}` } ref={ hintRefs[index] }>
      <span className={`${styles.checked}`}>✔︎</span>
      <span className={`${styles.unchecked}`}>✘</span>
      { message }
    </li>
  ));

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    passwordValiadtion(event.target.value)
  }

  function passwordValiadtion(pass) {
    const validationRules = [
      pass.length >= 8,
      [...pass].some(character => character.match(/[a-z]/)),
      [...pass].some(character => character.match(/[A-Z]/)),
      [...pass].some(character => character.match(/[0-9]/)),
      [...pass].some(character => character.match(/[!@#$%^&*()_,.?":{}|<>]/))
    ];

    validationRules.forEach((ruleElement, index) => {
      hintRefs[index].current.classList.toggle(checkedClassName, ruleElement);
      validationState.push(ruleElement);
    })
    
    setValidationMessage(); 
  }

  function setValidationMessage() {
    validationState.every(state => state) ? setValidationStatus('Form is valid') : setValidationStatus('Form is not valid');
  }

  function handleSubmit(event) {
    event.preventDefault();    
    alert(`${validationStatus} for ${email}`);
  }

  return (
    <div className={ styles.registration }>
      <form onSubmit={ handleSubmit }>
        <fieldset className={ `${styles.fieldset}` }>
          <div className={ `${styles.grid} ${styles['grid--gap']}` }>
            <div className={ `${styles.col} ${styles['col--sm-12']} ${styles['col--md-6']}` }>
              <label className={ styles.label } htmlFor="email">Email</label>
              <input className={ `${styles.input} ${styles['input--expand']}` } 
                type="email" 
                id="email" 
                name="email-control" 
                value={ email } 
                onChange={ handleEmailChange } 
                required
              />
            </div>
            
            <div className={ `${styles.col} ${styles['col--sm-12']} ${styles['col--md-6']}` }>
              <div className={styles.validation}></div>
              <label className={ `${styles.label} ${styles['label--password']}` } htmlFor="password">Password</label>
              <input className={ `${styles.input} ${styles['input--expand']}` } 
                     type="password" 
                     id="password" 
                     name="password-control" 
                     value={ password } 
                     onChange={ handlePasswordChange } 
                     required/>
              
              <ul className={ styles.hints }>
                { hintItems }
              </ul>

              <button className={ styles.button } type="submit">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
