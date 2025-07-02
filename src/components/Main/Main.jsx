import React, { useContext, useRef, useState} from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isDarkMode = document.body.classList.contains('dark-mode');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p className='app-logo'>Brainix</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult
          ? <>
            <div className="greet">
              <p><span>Hello there!</span></p>
              <p>How can I help you today</p>
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
          : <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.bubble_icon} alt="" />
              {loading
                ? <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }

            </div>
          </div>

        }



        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelect}
              />

              <img
                src={isDarkMode ? assets.gallery_white : assets.gallery_icon}
                alt="gallery"
                onClick={triggerFileInput}
                style={{ cursor: 'pointer' }}
              />

              <img
                src={isDarkMode ? assets.mic_white : assets.mic_icon}
                alt="mic"
              />

              {input || selectedFile ? (
                <img
                  onClick={() => {
                    onSent();
                    if (selectedFile) {
                      console.log("Sending file:", selectedFile.name);
                      // You can upload file here
                      setSelectedFile(null);
                    }
                  }}
                  src={isDarkMode ? assets.send_white : assets.send_icon}
                  alt="send"
                  style={{ cursor: 'pointer' }}
                />
              ) : null}

            </div>
            {selectedFile && (
              <p style={{ fontSize: '12px', color: isDarkMode ? 'white' : 'black', marginTop: '5px' }}>
                Attached: {selectedFile.name}
              </p>
            )}

          </div>
          <p className="bottom-info">
            Brainix may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
