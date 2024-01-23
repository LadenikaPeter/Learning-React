import "./ExpenseDate.css";
const ExpenseDate = (props) => {
  const month = props.expenseObject.date.toLocaleString("en-US", {
    month: "long",
  });
  const day = props.expenseObject.date.toLocaleString("en-US", {
    day: "2-digit",
  });
  const year = props.expenseObject.date.getFullYear();
  return (
    <div className="expense-date ">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="">{day}</div>
    </div>
  );
};

export default ExpenseDate;
