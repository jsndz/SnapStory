import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Signup from './pages/Signup';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-10 font-black uppercase">Checking auth...</div>;
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/create" 
              element={
                <PrivateRoute>
                  <CreateBlog />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="mt-20 border-t-2 border-black py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} SNAPSTORY. KEEP IT MINIMAL.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
