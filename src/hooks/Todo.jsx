import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos_item")) || [],
  );
  const [inputValue, setInputValue] = useState("");
  const handleAddTodo = () => {
    if (!inputValue) {
      alert("Please Enter a Value to Add");
    }
    const newdata = {
      id: Date.now(),
      value: inputValue,
    };
    const newData = [newdata, ...todos];
    setTodos(newData);
    localStorage.setItem("todos_item", JSON.stringify(newData));
    setInputValue("");
  };
  const handleRemoveTodo = (id) => {
    const filterData = todos.filter((item) => item.id !== id);
    setTodos(filterData);
    localStorage.setItem("todos_item", JSON.stringify(filterData));
  };
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <h1>Your Todos</h1>
      {todos?.length > 0 &&
        todos?.map((item) => (
          <ul key={item.id}>
            <li>
              {item.value}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={(e)=>handleRemoveTodo(item?.id)}
              >
                x
              </span>
            </li>
          </ul>
        ))}
    </>
  );
};

export default Todo;
