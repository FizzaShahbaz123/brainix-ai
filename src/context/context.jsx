import { createContext, use, useState } from "react";
import runChat from "../config/brainix";

export const Context = createContext();

function formatResponseText(text) {
  return text
  .replace(/```(?:\w+)?\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/^-{3,}$/gm, '<hr />')
  .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
  .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
  .replace(/\*/gim, '<br />');
}

const ContextProvider = (props) => {

  const [input,setInput] =useState("");
  const [recentPrompt,setRecentPrompt] =useState("");
  const [prevPrompts,setPrevPrompts] = useState([]);
  const [showResult,setShowResult] = useState(false);
  const [loading,setLoading] = useState(false);
  const [resultData,setResultData] = useState("");

  const delayPara = (index,nextWord) => {
    setTimeout(function () {
      setResultData(prev=>prev+nextWord);
    },75*index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {

    setResultData("")
    setLoading(true)
    setShowResult(true)

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt)
    } else {
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response = await runChat(input)
    }

    let formattedResponse = formatResponseText(response);
    let wordsArray = formattedResponse.split(" ");
    for (let i = 0; i < wordsArray.length; i++) {
      const nextWord = wordsArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false)
    setInput("")
  
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;