import React, { useState } from "react";
import service from "../appwrite/todoService";

export default function AddTodo({ onTodoAdded }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Only include the content field as required by the schema
      const todo = { content: content.trim() };
      const response = await service.addTodo(todo);
      onTodoAdded && onTodoAdded(response);
      setContent("");
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert("Failed to add todo: " + (error.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="space-y-4">
      <div className="flex items-start space-x-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
            required
          />
        </div>
        <button 
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}
