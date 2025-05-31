import React, { createContext, useRef } from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import axios from 'axios'

export const getContext = createContext()

function App() {
  const [questions, setQuestions] = useState('')
  const [getresponse, setResponse] = useState('')
  const [loader, setLoader] = useState()
  const [newChat, setNewChat] = useState(false)
  const textField = useRef()
  const [show, setShow] = useState(false)
  const [askedQuestion, setAskedQuestion] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [recent, setRecent] = useState(() => {
    let data = localStorage.getItem("recentData")
    return data !== null ? JSON.parse(data) : []
  })

  // Lazy initialization of state
  const [extended, setExtended] = useState(() => {
    let data = localStorage.getItem("sideBar")
    return data !== null ? JSON.parse(data) : false
  })


  // setting the data in localstorage 
  useEffect(() => {
    let sideBar = localStorage.setItem("sideBar", JSON.stringify(extended))
    if (recent.length > 0) {
      let saveTheme = localStorage.setItem("recentData", JSON.stringify(recent))
    } else {
      localStorage.removeItem("recentData");
    }
  }, [recent, extended])


  function formattedText(myData) {
    // Handle bold text (**bold** becomes <strong>bold</strong>)
    let formatted = myData.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle italic text (*italic* becomes <em>italic</em>)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Optional: If you want to add line breaks for paragraphs or newlines
    formatted = formatted.replace(/\n/g, '<br/>');

    return formatted;
  }

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function getUser(prompt) {
    try {
      // setResponse(loader)
      setLoader(true)
      let response = await axios({
        method: 'post',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        data: { "contents": [{ "parts": [{ "text": prompt }] }] }
      });

      let myData = response.data.candidates[0].content.parts[0].text
      setResponse(formattedText(myData))
      // console.log(response.data.candidates[0].content.parts[0].text)
    }
    catch (error) {
      console.log("erro to get data", error)
    }
    finally {
      setLoader(false)
    }
  }

  return (
    <getContext.Provider value={{ getresponse, getUser, questions, setQuestions, recent, setRecent, newChat, setNewChat, textField, show, setShow, askedQuestion, setAskedQuestion, formattedText, selectedIndex, setSelectedIndex, extended, setExtended, loader, setLoader }}>
      <div className='flex h-[100vh]'>
        <Sidebar />
        <Main />
      </div>
    </getContext.Provider>

  )
}

export default App

