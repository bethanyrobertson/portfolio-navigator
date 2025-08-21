'use client';

import React from 'react';
import ChatInterface from './ChatInterface';

const HomePageChat = () => {
  return (
    <>
      {/* Chat Widget - Centered and responsive - EXACT same as home page */}
      <div className="fixed top-20 left-0 right-0 bottom-0 flex items-center justify-center z-40 pointer-events-none">
        <div className="w-full max-w-2xl mx-4 md:mx-8 pointer-events-auto">
          <ChatInterface />
        </div>
      </div>
    </>
  );
};

export default HomePageChat;
