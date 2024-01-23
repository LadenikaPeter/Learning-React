import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [selectedYear, setSelectedYear] = useState("2020");

  const dateChangeHandler = (selectedDate) => {
    setSelectedYear(selectedDate);
  };

  const filteredArray = props.expenseArray.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        filteredYear={selectedYear}
        onDateChange={dateChangeHandler}
      />
      <ExpensesChart expenses={filteredArray} />
      <ExpensesList list={filteredArray} />
    </Card>
  );
};

export default Expenses;
