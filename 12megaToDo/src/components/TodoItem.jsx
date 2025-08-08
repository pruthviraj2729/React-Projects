import React from "react";
import service from "../appwrite/todoService";

export default function TodoItem({ todo, onDeleted }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await service.deleteTodo(todo.$id);
        onDeleted && onDeleted(todo.$id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert("Failed to delete todo: " + (error.message || 'Unknown error'));
      }
    }
  };

  return (
    <div className="flex items-start justify-between group">
      <div className="flex-1">
        <p className="text-gray-800">
          {todo.content}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Delete todo"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
