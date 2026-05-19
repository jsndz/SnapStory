import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PenSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black uppercase tracking-tighter">
        SnapStory
      </Link>
      
      <div className="flex items-center gap-8">
        {user ? (
          <>
            <Link to="/create" className="flex items-center gap-2 hover:underline">
              <PenSquare size={20} />
              <span className="hidden sm:inline font-bold uppercase text-sm">Write</span>
            </Link>
            <div className="flex items-center gap-4">
               <span className="hidden sm:inline text-sm font-medium">{user.email}</span>
               <button onClick={handleLogout} className="hover:text-gray-600 transition-colors">
                 <LogOut size={20} />
               </button>
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="font-bold uppercase text-sm hover:underline">Login</Link>
            <Link to="/signup" className="font-bold uppercase text-sm border-2 border-black px-3 py-1 bg-black text-white hover:bg-white hover:text-black transition-all">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
