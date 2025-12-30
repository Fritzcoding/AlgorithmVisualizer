'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      // Get or create user account
      const users = JSON.parse(localStorage.getItem('algoUsers') || '{}');
      
      if (users[username]) {
        // User exists - check password
        if (users[username].password === password) {
          // Password matches - login successful
          localStorage.setItem('currentUser', username);
          onLogin(username);
          setUsername('');
          setPassword('');
          onClose();
        } else {
          setError('Incorrect password');
        }
      } else {
        // User doesn't exist - create new account
        users[username] = {
          password: password,
          streak: 0,
          points: 0,
          lastVisit: new Date().toDateString()
        };
        localStorage.setItem('algoUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', username);
        onLogin(username);
        setUsername('');
        setPassword('');
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <p className="text-xs text-gray-600 mt-2">
            New user? Your account will be created automatically on first login.
          </p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
