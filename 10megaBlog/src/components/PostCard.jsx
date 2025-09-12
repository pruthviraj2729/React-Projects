import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  // Check if featuredImage exists before calling getFilePreview
  const previewUrl = featuredimage ? appwriteService.getFilePreview(featuredimage) : '';

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {previewUrl ? (
            <img src={previewUrl} alt={title} className="rounded-xl" />
          ) : (
            <div className="text-gray-500 italic">No Image Available</div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
