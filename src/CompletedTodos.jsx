import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import TodoItem from './TodoItem'; // Make sure this component is defined elsewhere

// Reducer function to handle todo actions
function todosReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function CompletedTodos({ initialTodos }) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  // Dispatch actions for toggling, editing, and deleting todos
  const toggleTodo = id => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const editTodo = (id, text) =>
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  const deleteTodo = id => dispatch({ type: 'DELETE_TODO', payload: id });

  // Filter out only the completed tasks
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="container">
      <h2>Completed Tasks</h2>
      <div className="todos">
        {completedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={() => toggleTodo(todo.id)}
            editTodo={text => editTodo(todo.id, text)}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
      <Link to="/">Back to Active Tasks</Link>
    </div>
  );
}

export default CompletedTodos;
