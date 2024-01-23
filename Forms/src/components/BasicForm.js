import useMine from "../hooks/use-mine";

const BasicForm = (props) => {
  const {
    enteredValue: enteredFirstName,
    valueIsValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    enteredValueHandler: enteredFirstNameHandler,
    onBlurHandler: firstNameInputWasTouched,
    reset: resetFirstNameInput,
  } = useMine((value) => value.trim() !== "");

  const {
    enteredValue: enteredLastName,
    valueIsValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    enteredValueHandler: enteredLastNameHandler,
    onBlurHandler: lastNameInputWasTouched,
    reset: resetLastNameInput,
  } = useMine((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailInputHasError,
    enteredValueHandler: enteredEmailHandler,
    onBlurHandler: emailInputWasTouched,
    reset: resetEmailInput,
  } = useMine((value) => value.trim() !== "" && value.includes("@"));

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitForm = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredEmail);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClass = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitForm}>
      <div className="control-group">
        <div className={firstNameInputClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={enteredFirstNameHandler}
            onBlur={firstNameInputWasTouched}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="error-text">First name is invalid</p>
          )}
        </div>
        <div className={lastNameInputClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={enteredLastNameHandler}
            onBlur={lastNameInputWasTouched}
            value={enteredLastName}
          />
          {lastNameInputHasError && (
            <p className="error-text">last name is invalid</p>
          )}
        </div>
      </div>
      <div className={emailInputClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={enteredEmailHandler}
          onBlur={emailInputWasTouched}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">E-mail is invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
