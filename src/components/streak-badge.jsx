"use client";
import React, { useState, useEffect } from 'react';
import LoginModal from './login-modal';

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user);
      updateUserStats(user);
    } else {
      setIsLoginOpen(true);
    }
  }, []);

  const updateUserStats = (username) => {
    try {
      const users = JSON.parse(localStorage.getItem('algoUsers') || '{}');
      if (users[username]) {
        const today = new Date().toDateString();
        const userData = users[username];
        
        if (userData.lastVisit === today) {
          // Same day - keep streak and points
          setStreak(userData.streak);
          setPoints(userData.points);
        } else {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          if (userData.lastVisit === yesterday) {
            // Consecutive day - increment streak
            const newStreak = userData.streak + 1;
            const newPoints = userData.points + (10 * newStreak);
            setStreak(newStreak);
            setPoints(newPoints);
            users[username] = {
              ...userData,
              streak: newStreak,
              points: newPoints,
              lastVisit: today
            };
            localStorage.setItem('algoUsers', JSON.stringify(users));
          } else {
            // Streak broken - reset to 1
            const newPoints = 10;
            setStreak(1);
            setPoints(newPoints);
            users[username] = {
              ...userData,
              streak: 1,
              points: newPoints,
              lastVisit: today
            };
            localStorage.setItem('algoUsers', JSON.stringify(users));
          }
        }
      }
    } catch (e) {
      console.error('Error updating user stats:', e);
      setStreak(0);
      setPoints(0);
    }
  };

  const handleLogin = (username) => {
    setCurrentUser(username);
    updateUserStats(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setStreak(0);
    setPoints(0);
    setShowDetails(false);
    setIsLoginOpen(true);
  };

  if (!currentUser) {
    return <LoginModal isOpen={isLoginOpen} onClose={() => {}} onLogin={handleLogin} />;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(79, 70, 229, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(79, 70, 229, 0.4);
          }
        }
        @keyframes flame-bounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-3px); }
        }
        .streak-badge-container {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .flame-icon {
          animation: flame-bounce 2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
      
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="streak-badge-container bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white rounded-2xl p-4 shadow-2xl cursor-pointer transition-all hover:scale-105 max-w-sm"
      >
        <div className="space-y-3">
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-orange-50 truncate pr-2">{currentUser}</div>
            <div className="bg-black bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
              LVL {Math.floor(points / 100) + 1}
            </div>
          </div>

          {/* Main Display */}
          <div className="flex items-center gap-4 bg-black bg-opacity-20 rounded-xl p-3">
            <div className="flame-icon text-5xl">🔥</div>
            <div>
              <div className="text-3xl font-black text-white">{streak}</div>
              <div className="text-xs text-orange-100 font-semibold">day streak</div>
            </div>
          </div>

          {/* Points Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-orange-100">Points</span>
              <span className="text-yellow-200">{points}</span>
            </div>
            <div className="w-full bg-black bg-opacity-30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((points % 100) / 100 * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Detailed View */}
          {showDetails && (
            <div className="space-y-2 mt-3 border-t border-white border-opacity-20 pt-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black bg-opacity-20 rounded-lg p-2">
                  <div className="text-orange-100 text-xs font-semibold">Total Points</div>
                  <div className="text-xl font-bold text-white">{points}</div>
                </div>
                <div className="bg-black bg-opacity-20 rounded-lg p-2">
                  <div className="text-orange-100 text-xs font-semibold">Level</div>
                  <div className="text-xl font-bold text-white">{Math.floor(points / 100) + 1}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-xs font-bold bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors text-white"
              >
                Logout
              </button>
            </div>
          )}

          {/* Hint */}
          {!showDetails && (
            <div className="text-xs text-orange-50 text-center font-semibold opacity-75">
              Click to see more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
