import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import StaffNavbar from './Staffnavbar';

function Staffhome() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('Staffs'); 

  const staffId = useSelector(state => state.Staffs);
  console.log(staffId); 
  const adminId = useSelector(state => state.Admin.admin); 
  const socket = io('http://localhost:3000');

  useEffect(() => {
    const storedMessages = localStorage.getItem('staffMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('staffMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (staffId) {
      socket.on('staff message', (msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
      });

      return () => {
        socket.off('staff message');
      };
    }
  }, [staffId, socket]);

  const sendMessage = () => {
    const newMessage = { recipient: activeTab, message, sender: 'Staff' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    socket.emit('chat message', newMessage);
    setMessage('');
  };

  return (
    <>
    <StaffNavbar/>
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Staff Home</h1>
      {staffId && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Staff Chat</h2>
          <div className="mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p><strong>{msg.sender}: </strong>{msg.message}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Send
          </button>
          <div className="flex justify-between mt-4">
            <button onClick={() => setActiveTab('admin')} className="flex-1 mr-2 bg-gray-300 hover:bg-gray-400 py-2 rounded-md focus:outline-none focus:bg-gray-400">
              Admin
            </button>
            <button onClick={() => setActiveTab('user')} className="flex-1 mr-2 bg-gray-300 hover:bg-gray-400 py-2 rounded-md focus:outline-none focus:bg-gray-400">
              User
            </button>
            <button onClick={() => setActiveTab('staff')} className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded-md focus:outline-none focus:bg-gray-400">
              Staff
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Staffhome;
