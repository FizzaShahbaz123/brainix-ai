import React,{useContext, useState,useEffect} from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets.js'
import { Context } from '../../context/context.jsx';

const Sidebar = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const [extended,setExtended] = useState(false);
  const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={() => {setExtended(prev=>!prev)}} className="menu" src={assets.menu_icon}/>
        <div onClick={() =>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended?<p>New Chat</p>:null}
        </div>
        {extended
        ?<div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map((item,index) => {
            return (
              <div onClick={() =>loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)} ...</p>
              </div>
            )
          })}
          
        </div> :null
      } 
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div onClick={toggleTheme} className="bottom-item recent-entry theme-button">
          <img src={assets.brightness_icon} alt="" />
          {extended?<p>Theme</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
