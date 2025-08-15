import React, { useState, useEffect, useCallback } from 'react';
import authService from './appwrite/auth';
import todoService from './appwrite/todoService';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function App() { 
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized auth check function 
  const checkAuth = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setError(null);
      return userData;
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      if (error.code !== 401) {
        setError('Failed to check authentication status. Please refresh the page.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial auth check on mount
  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      await checkAuth();
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  // Handle login success
  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await checkAuth();
      if (!userData) {
        setError('Login successful but failed to fetch user data');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [checkAuth]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle between login and register forms
  const toggleAuthMode = useCallback(() => {
    setShowRegister(prev => !prev);
    setError(null);
  }, []);

  // Handle successful registration
  const handleRegisterSuccess = useCallback(() => {
    setShowRegister(false);
    setError('Registration successful! Please log in.');
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  // Show error message if any
  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            12megaToDo
          </h1>
          <p className="text-gray-600">Your ultimate task management solution</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
          </div>
        ) : user ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h2>
                  <p className="text-blue-100">What's on your mind today?</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 sm:mt-0 px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
            <div className="p-6">
              <TodoList />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setShowRegister(false)}
                className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition-colors duration-200 ${!showRegister ? 'text-blue-600 border-b-2 border-blue-500 font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition-colors duration-200 ${showRegister ? 'text-blue-600 border-b-2 border-blue-500 font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Create Account
              </button>
            </div>
            <div className="p-8">
              {showRegister ? (
                <Register 
                  onRegister={handleLogin} 
                  onSuccess={handleRegisterSuccess} 
                  switchToLogin={() => setShowRegister(false)} 
                />
              ) : (
                <Login 
                  onLogin={handleLogin} 
                  onRegister={() => setShowRegister(true)}
                />
              )}
            </div>
          </div>
        )}
        
        {/* {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md flex items-start">
            <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium">Something went wrong</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )} */}
      </main>
      
      <footer className="mt-16 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} 12megaToDo. All rights reserved.</p>
      </footer>
    </div>
  ); 
 }

export default App;
