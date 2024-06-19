'use client'
import React, { useEffect, useState } from 'react';

const Message = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:8000/message');
        const data = await res.json();
        setMessages(data.data); // Adjust to access the correct part of the response
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className='bg-gray-400 w-full min-h-screen p-2 grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4'>
      <div className='flex flex-col justify-center bg-transparent rounded-lg shadow-lg'>
        <h1 className='flex flex-col items-center font-bold text-4xl bg-slate-300 shadow-lg rounded-lg p-4 mb-3'>MESSAGE FROM HOSPITAL TEAM </h1>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className='flex flex-col items-center mt-2 p-20 font-semibold bg-slate-300 shadow-xl rounded-lg'>
              
             
                <p className='text-sm mb-1'>{message.message}</p>
              
              
                <p className='text-2xl font-bold mb-2'>{message.name}</p>
                <p className='text-sm'>{message.messageFrom}</p>
              
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
      <div className='flex flex-col justify-start items-center bg-slate-200 p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-blue-600 mt-5'>Health Tips</h2>
        <h3 className='text-xl font-semibold text-red-600 mt-2'>Covid-19</h3>
        <p className='text-left mt-4'>
          Whether you are in quarantine or self-isolation due to COVID-19, you will inevitably be spending more time at home. Following general healthy living advice such as eating a balanced diet, staying hydrated, being physically active, getting enough sleep, and managing stress are the best recommendations for staying healthy during quarantine or self-isolation. If you are interested in food-related issues with COVID-19, read Food and coronavirus (COVID-19): what you need to know.
        </p>
        <ul className='list-disc text-left mt-4 ml-4'>
          <li>Eat a balanced and varied diet</li>
          <li>Establish a routine and practice mindful eating</li>
          <li>Keep hydrated</li>
          <li>Practice safe food hygiene</li>
          <li>Stay active at home</li>
          <li>Get enough quality sleep</li>
          <li>Get information from trustworthy sources</li>
        </ul>
      </div>
    </div>
  );
};

export default Message;
