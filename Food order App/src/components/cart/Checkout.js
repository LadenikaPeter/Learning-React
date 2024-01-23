import classes from "./Checkout.module.css";
import useForm from "../../hooks/useForm";

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameInputHasError,
    enteredValueHandler: enteredNameHandler,
    onBlurHandler: nameInputWasTouched,
    reset: resetNameInput,
  } = useForm((value) => value.trim() !== "");

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    hasError: streetInputHasError,
    enteredValueHandler: enteredStreetHandler,
    onBlurHandler: streetInputWasTouched,
    reset: resetStreetInput,
  } = useForm((value) => value.trim() !== "");

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    hasError: cityInputHasError,
    enteredValueHandler: enteredCityHandler,
    onBlurHandler: cityInputWasTouched,
    reset: resetCityInput,
  } = useForm((value) => value.trim() !== "");

  const {
    enteredValue: enteredPostal,
    valueIsValid: postalIsValid,
    hasError: postalInputHasError,
    enteredValueHandler: enteredPostalHandler,
    onBlurHandler: postalInputWasTouched,
    reset: resetPostalInput,
  } = useForm((value) => value.trim().length === 5);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && cityIsValid && postalIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostal,
        city: enteredCity,
      });
      resetNameInput();
      resetCityInput();
      resetPostalInput();
      resetStreetInput();
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${nameInputHasError && classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          onChange={enteredNameHandler}
          onBlur={nameInputWasTouched}
          value={enteredName}
          type="text"
          id="name"
        />
        {nameInputHasError && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          streetInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          onChange={enteredStreetHandler}
          onBlur={streetInputWasTouched}
          value={enteredStreet}
          type="text"
          id="street"
        />
        {streetInputHasError && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          postalInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          onChange={enteredPostalHandler}
          onBlur={postalInputWasTouched}
          value={enteredPostal}
          type="text"
          id="postal"
        />
        {postalInputHasError && <p>Please enter a valid postal code</p>}
      </div>
      <div
        className={`${classes.control} ${cityInputHasError && classes.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input
          onChange={enteredCityHandler}
          onBlur={cityInputWasTouched}
          value={enteredCity}
          type="text"
          id="city"
        />
        {cityInputHasError && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className={`${formIsValid && classes.submit}`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
