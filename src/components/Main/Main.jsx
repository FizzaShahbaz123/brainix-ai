import React, { useContext, useState } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import Sidebar from '../Sidebar/Sidebar'; 

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkMode = document.body.classList.contains('dark-mode');

  return (
    <div className='main'>
      {mobileMenuOpen && (
        <div className="mobile-sidebar">
          <Sidebar mobile={true}/>
          <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>
      )}

      <div className="nav">
        <p className='app-logo'>Brainix</p>

        <img
          src={isDarkMode ? assets.menu_white_icon : assets.menu_icon}
          className="mobile-menu-icon"
          alt="menu"
          onClick={() => setMobileMenuOpen(true)}
        />

        <img
          src={assets.user_icon}
          className="profile-icon"
          alt="profile"
        />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello there !</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.bubble_icon} alt="" />
              {loading ? (
                <div className='loader'>
                  <hr /><hr /><hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSent()}
              type="text"
              value={input}
              placeholder="Enter a prompt here"
            />
            <div>
              <input
                type="file"
                style={{ display: 'none' }}
                id="fileInput"
              />
              <img
                src={isDarkMode ? assets.gallery_white : assets.gallery_icon}
                alt="gallery"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <img
                src={isDarkMode ? assets.mic_white : assets.mic_icon}
                alt="mic"
              />
              {input && (
                <img
                  src={isDarkMode ? assets.send_white : assets.send_icon}
                  alt="send"
                  onClick={onSent}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Brainix may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
