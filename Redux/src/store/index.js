import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter";
import authReducer from "./Auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

// const counterReducer = (state, action) => {
//   if (action.type === "INCREMENT") {
//     return { counter: state.counter + 1, showCounter: state.showCounter };
//   }

//   if (action.type === "INCREASE") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "DECREMENT") {
//     return { counter: state.counter - 1, showCounter: state.showCounter };
//   }

//   if (action.type === "SHOW") {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }

//   return defaultState;
// };
