import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  if (props.list.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses found.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.list.map((item) => (
        <ExpenseItem key={item.id} expenseObject={item} />
      ))}
    </ul>
  );
};

export default ExpensesList;
