import React from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const authorName = typeof blog.user === 'object' ? blog.user.name : 'Unknown Author';
  const date = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all bg-white group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
          {typeof blog.tag === 'object' ? blog.tag.title : 'General'}
        </span>
        <span className="text-xs font-medium text-gray-500">{date}</span>
      </div>
      
      <Link to={`/blog/${blog._id}`}>
        <h2 className="text-2xl font-black mb-3 group-hover:underline uppercase leading-tight">
          {blog.title}
        </h2>
      </Link>
      
      <p className="text-gray-600 line-clamp-3 mb-6 font-medium">
        {blog.content}
      </p>
      
      <div className="flex justify-between items-center pt-4 border-t-2 border-black">
        <span className="text-sm font-bold uppercase tracking-tight">By {authorName}</span>
        <Link 
          to={`/blog/${blog._id}`} 
          className="text-sm font-black uppercase hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
