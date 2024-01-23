import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveData = (expenseData) => {
    const expense = {
      ...expenseData,
      id: Math.random().toString(),
    };

    props.onAddExpense(expense);
    setIsEditing(false);
  };

  const showFormHandler = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="new-expense">
      {!isEditing && <button onClick={showFormHandler}>Add new expense</button>}
      {isEditing && (
        <ExpenseForm onSaveData={saveData} removeForm={showFormHandler} />
      )}
    </div>
  );
};

export default NewExpense;
