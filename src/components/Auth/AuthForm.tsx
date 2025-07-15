import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email);
        if (!success) {
          setError('User not found. Please register first.');
        }
      } else {
        success = await register(email, isAdmin);
        if (!success) {
          setError('User already exists. Please login instead.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Future<span className="text-purple-400">Cal</span>
            </h1>
            <p className="text-gray-300">
              {isLogin ? 'Welcome back' : 'Join the future of events'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {!isLogin && (
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-black/30 border-white/20 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="admin" className="text-gray-300 text-sm">
                    Register as administrator
                  </label>
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-purple-400 hover:text-purple-300 font-medium mt-2 transition-colors duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Demo: admin@example.com (admin access)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;