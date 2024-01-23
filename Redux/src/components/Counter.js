import { useDispatch, useSelector } from "react-redux";
import classes from "./Counter.module.css";
import {
  decrement,
  increase,
  increment,
  toggleCounter,
} from "../store/Counter";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  const dispatchFn = useDispatch();

  const toggleCounterHandler = () => {
    dispatchFn(toggleCounter());
  };

  const incrementHandler = () => {
    dispatchFn(increment());
  };

  const increaseHandler = () => {
    dispatchFn(increase(10));
  };

  const decrementHandler = () => {
    dispatchFn(decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
