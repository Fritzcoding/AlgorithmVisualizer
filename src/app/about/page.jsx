"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar'

const CANVA_LINK = "https://www.canva.com/design/DAG4L7kOlBM/JMsDWZzmRWqDuGVEr6dNLw/edit?utm_content=DAG4L7kOlBM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton";

export default function AboutPage() {
  useEffect(() => {
    // hide the global comet/asteroid/UFO layer on the about page
    const layer = document.querySelector('.comet-layer');
    const prev = layer ? layer.style.display : null;
    if (layer) layer.style.display = 'none';
    return () => {
      if (layer) layer.style.display = prev || '';
    };
  }, []);

  return (
    <div className="algo-page-wrapper min-h-screen flex flex-col">
      <Navbar title="About" hideAbout />

      <main className="flex-1 flex items-center justify-center w-full">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-white mb-6">Information</h2>
        <a href={CANVA_LINK} target="_blank" rel="noreferrer" className="block">
          <div className="bg-black rounded-lg overflow-hidden p-6 flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl">
            <div className="flex-shrink-0 flex items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <rect x="3" y="3" width="14" height="18" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.2"/>
                <path d="M7 7H13" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M7 11H13" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M7 15H11" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white text-lg font-medium">Presentation file</div>
            </div>
          </div>
        </a>
        </div>
      </main>
    </div>
  );
}
