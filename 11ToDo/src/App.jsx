import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [dark, setDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">To-Do List</h1>
        <div className="flex gap-4 mb-4">
          <input
            className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 outline-none"
            type="text"
            placeholder="Add new task"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <li className="text-gray-500 text-center">No tasks yet.</li>
          )}
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 rounded ${task.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4"
                />
                {editingId === task.id ? (
                  <input
                    className="flex-1 px-2 py-1 rounded border dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 outline-none"
                    value={editInput}
                    onChange={e => setEditInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  />
                ) : (
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {editingId === task.id ? (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-2 py-1 rounded"
                    onClick={() => startEdit(task.id, task.text)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/* Optional: Dark mode toggle */}
        <button
          className="mt-6 block mx-auto px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded"
          onClick={() => setDark(d => !d)}
        >
          Toggle {dark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
}

export default App;
