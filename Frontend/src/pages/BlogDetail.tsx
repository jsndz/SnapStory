import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import type { Blog, Comment } from '../types';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, commentRes] = await Promise.all([
          client.get(`/blog/${id}`),
          client.get(`/${id}/comments`)
        ]);

        if (blogRes.data.sucess) {
          setBlog(blogRes.data.data);
        }
        if (commentRes.data.sucess) {
          setComments(commentRes.data.data);
        }
      } catch (err) {
        setError('Failed to load blog details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await client.post(`/${id}/comment`, { content: newComment });
      if (response.data.sucess) {
        setComments([...comments, response.data.data]);
        setNewComment('');
      }
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  if (loading) return <div className="p-10 font-black uppercase">Loading...</div>;
  if (error || !blog) return <div className="p-10 text-red-600 font-black uppercase">{error || 'Blog not found'}</div>;

  const authorName = typeof blog.user === 'object' ? blog.user.name : 'Unknown Author';

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
            {typeof blog.tag === 'object' ? blog.tag.title : 'General'}
          </span>
          <span className="text-sm font-medium text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 border-t-4 border-black pt-4">
          <span className="font-bold uppercase tracking-tight">By {authorName}</span>
        </div>
      </header>

      <article className="prose prose-xl max-w-none mb-16 font-medium text-lg leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </article>

      <section className="border-t-8 border-black pt-10">
        <h3 className="text-3xl font-black uppercase mb-8">Comments ({comments.length})</h3>
        
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-12">
            <textarea
              className="w-full border-4 border-black p-4 focus:outline-none focus:ring-4 focus:ring-black mb-4 h-32"
              placeholder="JOIN THE CONVERSATION..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit">POST COMMENT</Button>
          </form>
        ) : (
          <div className="bg-gray-100 p-6 border-2 border-dashed border-black mb-12">
            <p className="font-bold uppercase text-sm">Please login to comment.</p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <div key={comment._id} className="border-2 border-black p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold uppercase text-xs">
                  {typeof comment.user === 'object' ? comment.user.name : 'Unknown'}
                </span>
                <span className="text-[10px] text-gray-500 font-bold">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500 font-bold uppercase text-xs">No comments yet. Be the first!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
