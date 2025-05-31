import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { getContext } from '../App'
import Time from './Time'

function Main() {

  const value = useContext(getContext)

  const [crossicon, setCrossicon] = useState(false)

  function handleSend() {
    if (value.questions.trim() === "") return;

    if (value.selectedIndex !== null) {
      let updated = [...value.recent]
      updated[value.selectedIndex] = value.questions
      value.setRecent(updated)
      value.setAskedQuestion(value.questions)
      value.getUser(value.questions)
      value.setSelectedIndex("")
      value.setShow(true)
    }
    else {
      value.getUser(value.questions)
      value.setRecent(prev => [...prev, value.questions])
      value.setAskedQuestion(value.questions);
      value.setShow(true);
    }
    value.setQuestions("");
  }


  useEffect(() => {
    if (value.questions.trim().length > 0) {
      setCrossicon(true)
    }
    else {
      setCrossicon(false)
    }
  }, [value.questions])


  // function to clear textArea 
  function handleCrossIcon() {
    value.setQuestions("")
  }

  return (
    <>
      <div className="mainContainer relative w-[100vw] bg-gray-950 flex flex-col items-center gap-10">

        {/* navbar */}
        <div className='navbar w-[100%]'>
          <div className='mx-4 py-5 flex items-center justify-between'>

            <div className='flex gap-2 items-center'>
              <div onClick={() => value.setExtended(true)} className='hamburger sm:hidden block cursor-pointer'>
                <img className='w-6 h-6 invert' src={assets.menu_icon} alt=" menu icon" />
              </div>
              <h1 className='text-2xl text-gray-600 font-semibold invert'>Gemini</h1>
            </div>

            <Time />
            <div className='flex gap-2 items-center'>
              <img className='h-10 w-10 rounded-full' src={assets.user_icon} alt="user icon" />
            </div>
          </div>
        </div>

        {/* question/ answers box */}
        <div className={`mainContainer  px-[5%] sm:px-[20%] text-white max-h-[70%] w-[100%] ${value.show ? "overflow-y-auto" : "overflow-hidden"} `}>
          <div style={{ display: value.show ? "" : "none" }} className=' flex flex-col gap-3 p-4'>
            {/* question */}
            <div className='question flex items-center font-bold gap-2 text-xl '>
              <img className='h-10 w-10 rounded-full' src={assets.user_icon} alt="user icon" />
              <span>{value.askedQuestion}</span>
            </div>

            {/* answers */}
            <div className='flex gap-2 items-center'>
              <img className='w-11 h-11' src={assets.gemini_icon} alt="gemini icon" />
              {value.loader ? <div>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div> : <div style={{ display: value.show ? "" : "none" }} className='text-xl font-base'
                dangerouslySetInnerHTML={{ __html: value.getresponse }}
              />}

            </div>
          </div>
          <div style={{ display: value.show ? "none" : "" }} className="greet">
            {/* <h1 className='font-bold text-teal-700 text-7xl flex justify-center mt-40'>Hello, Users</h1> */}
            <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent flex justify-center mt-40">
              Hello, Users
            </h1>
          </div>
        </div>


        {/* Text-Field */}
        <div className="searchBar mt-5 absolute bottom-7 border bg-gray-950 border-white px-2 flex items-center rounded-2xl w-[90%] sm:w-[60%]">

          <textarea value={value.questions} onChange={(e) => value.setQuestions(e.target.value)} ref={value.textField} className="h-10 relative  text-lg  invert py-2 px-3 outline-none my-2 w-full resize-none overflow-hidden" rows="3" placeholder="Ask Gemini"></textarea>

          {crossicon && (
            <img onClick={handleCrossIcon} className="w-5 h-5 absolute right-30 bottom-4 cursor-pointer" src={assets.close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24} alt="close-img" />
          )}

          <div className="icons gap-4 flex flex-shrink-0 pr-2 invert">
            <img className="w-5 h-5" src={assets.gallery_icon} alt="gallery icon" />
            <img className="w-5 h-5" src={assets.mic_icon} alt="mic icon" />
            <img onClick={handleSend} className="w-5 h-5" src={assets.send_icon} alt="send icon" />
          </div>
        </div>

      </div >
    </>
  )
}

export default Main
