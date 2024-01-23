import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate expenseObject={props.expenseObject} />
        <div className="expense-item__description">
          <h2>{props.expenseObject.title}</h2>
          <div className="expense-item__price">
            ${props.expenseObject.amount}
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
