import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import Button from '../components/Button';
import Input from '../components/Input';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await client.post('/signup', { name, email, password });
      if (response.data.sucess) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-2">Signup</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input 
          label="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          placeholder="JOHN DOE"
        />
        <Input 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="YOU@EXAMPLE.COM"
        />
        <Input 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="••••••••"
        />
        
        {error && <p className="text-red-600 font-bold uppercase text-xs">{error}</p>}
        
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
        </Button>
      </form>
      
      <p className="mt-8 text-center font-bold uppercase text-sm">
        Already have an account? <Link to="/login" className="underline hover:text-gray-600">Login instead</Link>
      </p>
    </div>
  );
};

export default Signup;
