import { useState } from 'react';
import CompletedTodos from './CompletedTodos';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function ActiveTodos({ todos, toggleTodo, addTodo, editTodo, deleteTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="container">
      <h2>Active Tasks</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todos">
        {todos
          .filter(todo => !todo.completed)
          .map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
      </div>
      <Link to="/completed">View Completed Tasks</Link>
    </div>
  );
}

// function CompletedTodos({ todos, toggleTodo, editTodo, deleteTodo }) {
//   return (
//     <div className="container">
//       <h2>Completed Tasks</h2>
//       <div className="todos">
//         {todos
//           .filter(todo => todo.completed)
//           .map(todo => (
//             <TodoItem
//               key={todo.id}
//               todo={todo}
//               toggleTodo={toggleTodo}
//               editTodo={editTodo}
//               deleteTodo={deleteTodo}
//             />
//           ))}
//       </div>
//       <Link to="/">Back to Active Tasks</Link>
//     </div>
//   );
// }

function TodoItem({ todo, toggleTodo, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <label>{todo.text}</label>
        )}
      </div>
      <div className="right">
        {isEditing ? (
          <button className="save" onClick={handleSave}>Save</button>
        ) : (
          <>
            <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={() => deleteTodo(todo.id)} disabled={!todo.completed}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Todo 1", completed: false },
    // Additional todos can be added here
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // simple unique id generation
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]); // Add new todos to the top
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, text) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <BrowserRouter>
      <div>
        <header>Todo List</header>
        <Routes>
          <Route
            path="/"
            element={
              <ActiveTodos
                todos={todos}
                toggleTodo={toggleTodo}
                addTodo={addTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <CompletedTodos
                todos={todos}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}