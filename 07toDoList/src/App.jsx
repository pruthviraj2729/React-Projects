import React from "react";
import { useState } from "react";
import "./App.css"


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [dark, setDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Save tasks to localStorage
  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode class on body
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  
  const addTask = () => {
        if (input.trim() === '') return;
        setTasks([
          ...tasks,
          { id: Date.now(), text: input, completed: false }
        ]);
        setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editInput } : task
    ));
    setEditingId(null);
    setEditInput('');
  };


  return(
    <div className="container">
      <div className="to-do-wrapper">
        <h1 className="to-do-title">to-do-list</h1>
        <div className="to-do-input-section">
          <input
          className="to-do-input"
          type="text"
          placeholder="Add new task"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>
         <ul className="todo-list">
           {tasks.length === 0 && (
            <li className="todo-empty">No tasks yet.</li>
          )}
          {tasks.map(task => (
            <li key={task.id} className={`todo-item${task.completed ? ' completed' : ''}`}>
              <div className="todo-item-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="todo-checkbox"
                />
                {editingId === task.id ? (
                  <input
                    className="todo-edit-input"
                    value={editInput}
                    onChange={e => setEditInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  />
                ) : (
                  <span className="todo-text">
                    {task.text}
                  </span>
                )}
              </div>
              <div className="todo-actions">
                {editingId === task.id ? (
                  <button
                    className="save-btn"
                    onClick={() => saveEdit(task.id)}
                  >Save</button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(task.id, task.text)}
                  >Edit</button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;

// function App() {
//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [input, setInput] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editInput, setEditInput] = useState('');
//   const [dark, setDark] = useState(() => {
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   // Save tasks to localStorage
//   React.useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Toggle dark mode class on body
//   React.useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [dark]);

//   const addTask = () => {
//     if (input.trim() === '') return;
//     setTasks([
//       ...tasks,
//       { id: Date.now(), text: input, completed: false }
//     ]);
//     setInput('');
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   const toggleTask = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const startEdit = (id, text) => {
//     setEditingId(id);
//     setEditInput(text);
//   };

//   const saveEdit = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, text: editInput } : task
//     ));
//     setEditingId(null);
//     setEditInput('');
//   };

//   return (
//     <div className="container">
//       <div className="todo-wrapper">
//         <h1 className="todo-title">To-Do List</h1>
//         <div className="todo-input-section">
//           <input
//             className="todo-input"
//             type="text"
//             placeholder="Add a new task..."
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && addTask()}
//           />
//           <button
//             className="add-btn"
//             onClick={addTask}
//           >Add</button>
//         </div>
//         <ul className="todo-list">
//           {tasks.length === 0 && (
//             <li className="todo-empty">No tasks yet.</li>
//           )}
//           {tasks.map(task => (
//             <li key={task.id} className={`todo-item${task.completed ? ' completed' : ''}`}>
//               <div className="todo-item-content">
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleTask(task.id)}
//                   className="todo-checkbox"
//                 />
//                 {editingId === task.id ? (
//                   <input
//                     className="todo-edit-input"
//                     value={editInput}
//                     onChange={e => setEditInput(e.target.value)}
//                     onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
//                   />
//                 ) : (
//                   <span className="todo-text">
//                     {task.text}
//                   </span>
//                 )}
//               </div>
//               <div className="todo-actions">
//                 {editingId === task.id ? (
//                   <button
//                     className="save-btn"
//                     onClick={() => saveEdit(task.id)}
//                   >Save</button>
//                 ) : (
//                   <button
//                     className="edit-btn"
//                     onClick={() => startEdit(task.id, task.text)}
//                   >Edit</button>
//                 )}
//                 <button
//                   className="delete-btn"
//                   onClick={() => deleteTask(task.id)}
//                 >Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <p className="footer-note">CRUD, localStorage – Next: Categories, Filters, Due Dates, Subtasks, Drag & Drop, Animations, Search, Dark Mode Toggle.</p>
//     </div>
//   );
// }

// export default App
