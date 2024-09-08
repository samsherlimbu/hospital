"use client";
import { Image } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications

const MessageDetails = ({ onCancel }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}message`
        );
        const result = res.data.data;
        setMessages(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}deletemessage/${id}` // Updated to pass _id
      );
      if (response.status === 200) {
        toast.success("Message deleted successfully");
        setMessages(messages.filter((message) => message._id !== id)); // Remove the deleted message from the list
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center bg-blue-600 text-white py-4">
            Message from Hospital Team
          </h1>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="p-6 border-b border-gray-300">
                <div className="flex justify-center mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}message-image/${message.messageImage}`}
                    alt="Message Image"
                    width={1000} // Adjusted width for better visibility
                    height={1000} // Adjusted height
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-base mb-2">
                    {message.message}
                  </p>
                  <p className="text-lg font-semibold mb-1">{message.name}</p>
                  <p className="text-sm text-gray-500">{message.messageFrom}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 mr-4 transition"
                    onClick={() => handleDelete(message._id)} // Pass the message ID to handleDelete
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading messages...</p>
          )}
        </div>
        <button
          className="bg-blue-500 text-white mt-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MessageDetails;
