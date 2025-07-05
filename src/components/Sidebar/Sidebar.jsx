import React, { useContext, useState, useEffect } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/context.jsx';

const Sidebar = (mobile) => {
  const [extended, setExtended] = useState(false);
  
  useEffect(() => {
    if (mobile) {
      setExtended(true);
    }
  }, [mobile]);

  const [darkMode, setDarkMode] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {!mobile && (
          <img
            onClick={() => setExtended(prev => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt="menu"
          />
        )}
        <div onClick={newChat} className="new-chat">
          <img src={darkMode ? assets.white_plus_icon : assets.plus_icon} alt="plus" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                <img src={darkMode ? assets.msg_white : assets.message_icon} alt="msg" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={darkMode ? assets.question_white : assets.question_icon} alt="help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div onClick={toggleTheme} className="bottom-item recent-entry theme-button">
          <img src={darkMode ? assets.brightness_white_icon : assets.brightness_icon} alt="theme" />
          {extended ? <p>Theme</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
