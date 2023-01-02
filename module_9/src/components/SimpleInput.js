import { useEffect, useRef, useState } from "react";

// DON'T import custom hook with {} bracket
// import {useInput} from '../hooks/use-input';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  // If you are only intereseted in the entered value only once then go with nameInputRef, it's not elegant with ref to reset the form value

  // If your need the value at every keystroke, for instant validation the use state, and if you want to reset the value

  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  //  const enteredNameIsValid = enteredName.trim() !== '';    // no need to have a special state for it
  //  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // const enteredEmailIsValid =
  //   enteredEmail.trim() !== "" &&
  //   enteredEmail.includes("@") &&
  //   enteredEmail.includes(".com"); // no need to have a special state for it
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler ,
    reset: resetEmailInput
  } = useInput(value => value.trim() !== "" &&
  value.includes("@") &&
  value.includes(".com"));


  // managing all the input of the form are valid or not
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };
  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const nameInputBlurHandler = event => {
  //   // onBlue works when use touches the input and input press at other part than input
  //   setEnteredNameTouched(true);

  //   // if (enteredName.trim() === '') {
  //   //   setEnteredNameIsValid(false);
  //   //   return;
  //   // }
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    
    // setEnteredEmailTouched(true);

    // if (enteredName.trim() === '') {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
    // setEnteredNameIsValid(true);
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
    console.log(enteredName);
    console.log(enteredEmail);

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    // setEnteredName("");
    // setEnteredNameTouched(false);
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
  };

  // const nameInputClasses = nameInputIsInvalid
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          // onChange={nameInputChangeHandler}
          onChange={nameChangedHandler}
          // onBlur={nameInputBlurHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {/* nameInputIsInvalid && */}
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          ref={nameInputRef}
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">email must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
