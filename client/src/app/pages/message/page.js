'use client';
import React, { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react'; // Ensure Image component is correctly imported

const Message = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}message`);
        const data = await res.json();
        setMessages(data.data); // Adjust to access the correct part of the response
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className='bg-gray-300 w-full  p-4'>
      <h1 className='text-4xl font-bold text-center text-blue-600 mt-2 mb-8'>Message from Hospital Team</h1>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className='bg-gray-400 p-6 rounded-lg shadow-lg w-full mb-4'>
            <div className='flex flex-col items-center w-full'>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}message-image/${message.messageImage}`}
                alt='Message Image'
                width={200} // Adjusted width for better visibility
                height={200} // Adjusted height for balance
                className='rounded-lg shadow-md object-cover mb-4'
              />
              <div className='text-center'>
                <p className='text-gray-800 mb-1'>{message.message}</p>
                <p className='font-semibold text-gray-900 mb-1'>{message.name}</p>
                <p className='font-semibold text-black'>{message.messageFrom}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500 text-lg'>Loading messages...</p>
      )}
    </div>
  );
};

export default Message;
