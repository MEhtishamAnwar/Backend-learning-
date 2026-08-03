import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    if (!todoName.trim()) return;
    onNewItem(todoName.trim(), dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="todo-form container">
      <div className="row todo-row align-items-end">
        <div className="col-md-6 mb-3 mb-md-0">
          <input
            className="todo-input"
            type="text"
            placeholder="What do you want to do?"
            value={todoName}
            onChange={handleNameChange}
          />
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <input
            className="todo-input"
            type="date"
            value={dueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="todo-button"
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
