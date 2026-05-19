import React, { useEffect, useState } from 'react';
import client from '../api/client';
import type { Blog } from '../types';
import BlogCard from '../components/BlogCard';

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await client.get('/blogs');
        if (response.data.sucess) {
          setBlogs(response.data.data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('Something went wrong while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-xl font-black animate-pulse">LOADING STORIES...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-bold uppercase">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-6">
      <header className="mb-16 border-b-8 border-black pb-8">
        <h1 className="text-8xl font-black uppercase tracking-[calc(-0.05em)] leading-[0.8]">
          Stories worth <br /> sharing.
        </h1>
        <p className="mt-8 text-xl font-bold uppercase tracking-tight max-w-2xl">
          A minimalistic space for big ideas and quick thoughts. Join the conversation and start writing today.
        </p>
      </header>

      {blogs.length === 0 ? (
        <p className="text-center font-bold uppercase text-gray-500">No stories found yet. Be the first to write one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
