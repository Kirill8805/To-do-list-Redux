import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./store";

const App = () => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(""); 
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text, dueDate }));
      setText("");
      setDueDate("");
    }
  };

  // Сортируем задачи по дате
  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.dueDate) return 1; 
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="container">
      <h1>Список дел</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span>{todo.text}</span>
            </div>
            <div className="date-container">
              <span className="due-date">
                {todo.dueDate ? `${todo.dueDate}` : "Без срока"}
              </span>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
