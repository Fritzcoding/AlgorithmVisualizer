'use client'

import { useEffect, useState } from 'react';
import GitHubButton from 'react-github-btn';

export default function Footer() {
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    // Simulate fetching visitor count
    // In a real application, you would fetch this from an API
    setVisitors(Math.floor(Math.random() * 10000))
  }, [])

  return (
    <footer className="bg-slate-900 bg-opacity-80 backdrop-blur-md py-6 px-6 border-t border-purple-500 border-opacity-30">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="text-sm text-gray-300">
          © {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

