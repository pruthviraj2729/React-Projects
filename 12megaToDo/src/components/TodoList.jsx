import React, { useEffect, useState } from "react";
import service from "../appwrite/todoService";
import TodoItem from "./TodoItem.jsx";
import AddTodo from "./AddTodo.jsx";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await service.getTodos();
        setTodos(response.documents || []);
      } catch (error) {
        console.error('Failed to load todos:', error);
        setError("Failed to load todos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTodos();
  }, []);

  // Handler for adding a new todo
  const handleTodoAdded = (newTodo) => {
    setTodos(prev => [newTodo, ...prev]);
  };

  // Handler for deleting a todo
  const handleTodoDeleted = (deletedId) => {
    setTodos(prev => prev.filter(todo => todo.$id !== deletedId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <AddTodo onTodoAdded={handleTodoAdded} />
      
      {todos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500">No todos yet. Add your first todo above!</p>
        </div>
      ) : (
        <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 overflow-hidden">
          {todos.map((todo) => (
            <li key={todo.$id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <TodoItem 
                todo={todo} 
                onDeleted={handleTodoDeleted} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
