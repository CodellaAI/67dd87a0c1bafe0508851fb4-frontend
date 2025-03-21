
"use client";

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setStatus('Sending request...');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp: new Date(), action: 'button_click' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('Success: Entry added to MongoDB!');
      } else {
        setStatus(`Error: ${data.message || 'Failed to add entry'}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Simple Click Logger</h1>
        <p className="text-center text-gray-600">
          Click the button below to log an entry in MongoDB
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`px-6 py-3 text-white font-medium rounded-md transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? 'Processing...' : 'Log Click to MongoDB'}
          </button>
        </div>
        
        {status && (
          <div className={`mt-4 p-3 rounded-md text-center ${
            status.includes('Success') 
              ? 'bg-green-100 text-green-800' 
              : status.includes('Error') 
                ? 'bg-red-100 text-red-800' 
                : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
