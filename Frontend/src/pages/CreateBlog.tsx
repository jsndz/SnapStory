import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import type { Tag } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagId, setTagId] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get('/tags');
        if (response.data.sucess) {
          setTags(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch tags');
      }
    };
    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await client.post('/blog', { 
        title, 
        content, 
        tag: tagId || undefined 
      });
      if (response.data.sucess) {
        navigate('/');
      } else {
        setError(response.data.message || 'Failed to create blog');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 border-b-8 border-black pb-4">
        New Story
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Input 
          label="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          placeholder="THE TITLE OF YOUR STORY..."
          className="text-2xl font-bold"
        />
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold uppercase tracking-wider">Tag</label>
          <select 
            className="border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white font-bold uppercase text-sm"
            value={tagId}
            onChange={(e) => setTagId(e.target.value)}
          >
            <option value="">SELECT A TAG...</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>{tag.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold uppercase tracking-wider">Content</label>
          <textarea
            className="border-2 border-black p-4 focus:outline-none focus:ring-2 focus:ring-black h-64 font-medium text-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="ONCE UPON A TIME..."
          />
        </div>
        
        {error && <p className="text-red-600 font-bold uppercase text-xs">{error}</p>}
        
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'PUBLISHING...' : 'PUBLISH STORY'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
