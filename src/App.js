import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTodos, setActiveTodos] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo) return;

    setTodoList([...todoList, { todo: newTodo, active: true }]);
    setNewTodo("");
  };

  const updateStatus = (index, active) => {
    const newTodoList = [...todoList];
    newTodoList[index].active = active;

    setTodoList(newTodoList);
  };

  const countActiveTodos = () => {
    if (todoList.length === 0) return 0;

    return todoList.reduce((ac, { active }) => (active ? ac + 1 : ac), 0);
  };

  useEffect(() => {
    setActiveTodos(countActiveTodos());
  }, [todoList]);

  return (
    <div className="App">
      <h1>You have {activeTodos} todos</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="input-todo"
            type="text"
            placeholder="Add new to do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-button">
          +
        </button>
      </form>

      <div className="todo-container">
        {todoList.map(({ todo, active }, idx) => (
          <div key={idx}>
            <input
              className="check-button"
              type="checkbox"
              checked={!active}
              onClick={() => updateStatus(idx, !active)}
            />
            <div className={`todo-div ${!active && "done"}`} onClick={() => updateStatus(idx, !active)}>{todo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
