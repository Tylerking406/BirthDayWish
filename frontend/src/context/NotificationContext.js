import React, { createContext, useContext, useState } from 'react';

// Create Notification Context
const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const addNotification = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const clearNotifications = () => {
    setMessages([]);
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ messages, notificationCount, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
