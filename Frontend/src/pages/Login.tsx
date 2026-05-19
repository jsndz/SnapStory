import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await client.post('/login', { email, password });
      if (response.data.sucess) {
        login(response.data.data);
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-2">Login</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </Button>
      </form>
      
      <p className="mt-8 text-center font-bold uppercase text-sm">
        New here? <Link to="/signup" className="underline hover:text-gray-600">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
