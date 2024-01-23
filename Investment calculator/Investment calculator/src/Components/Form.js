import { useState } from "react";
import styles from "./Form.module.css";

const Form = (props) => {
  const [savings, setSavings] = useState(10000);
  const [contribution, setContribution] = useState(1200);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [duration, setDuration] = useState(10);

  const inputChangehandler = (id, value) => {
    if (id === "savings") {
      setSavings(+value);
    } else if (id === "contribution") {
      setContribution(+value);
    } else if (id === "expectedReturn") {
      setExpectedReturn(+value);
    } else {
      setDuration(+value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const response = {
      "current-savings": savings,
      "yearly-contribution": contribution,
      "expected-return": expectedReturn,
      duration: duration,
    };

    console.log(response);
    props.calculate(response);
  };

  const resetHandler = () => {
    setSavings(10000);
    setContribution(1200);
    setExpectedReturn(7);
    setDuration(10);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(e) => inputChangehandler("savings", e.target.value)}
            type="number"
            id="current-savings"
            value={savings}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(e) => inputChangehandler("contribution", e.target.value)}
            type="number"
            id="yearly-contribution"
            value={contribution}
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(e) =>
              inputChangehandler("expectedReturn", e.target.value)
            }
            type="number"
            id="expected-return"
            value={expectedReturn}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(e) => inputChangehandler("duration", e.target.value)}
            type="number"
            id="duration"
            value={duration}
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button
          onClick={resetHandler}
          type="reset"
          className={styles.buttonAlt}
        >
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default Form;
