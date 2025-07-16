import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { getContext } from '../App'

function Sidebar() {

  const value = useContext(getContext)
  const [toggleMenu, setToggleMenu] = useState(null)
  // const [first, setfirst] = useState(second)

  // toggle hamburger
  function handleHamburger() {
    if (value.extended === true) {
      value.setExtended(false)
    }
    else {
      value.setExtended(true)
    }
  }

  // handle new chat
  function handleNewChat() {
    value.setShow(false)
    value.textField.current.focus()
    value.textField.current = ""
  }

  // this function run previous question
  const runPreviousFunc = (indexToBeCalled) => {
    value.setAskedQuestion(value.recent[indexToBeCalled])
    value.getUser(value.recent[indexToBeCalled])
    value.setShow(true)
  }

  // Function to Toggle Menu 
  function toggleMenuFunc(clickedIndex) {
    // console.log(clickedIndex)
    setToggleMenu(prev => prev === clickedIndex ? null : clickedIndex)
    // console.log(toggleMenu)
  }

  // functioon to handel delete
  function handleDelete(indexToBeDelete) {
    setToggleMenu(null)
    const newRecent = value.recent.filter((_, index) => index !== indexToBeDelete)
    value.setRecent(newRecent)
    setToggleMenu(false)
    value.setShow(false)
  }

  // function to edit questions 
  function handleEdit(indexToEdit) {
    setToggleMenu(null)
    let selected = value.recent[indexToEdit]
    value.setQuestions(selected)
    value.setSelectedIndex(indexToEdit)
  }

  return (
    <>
      <div className={`sidebarContainer fixed sm:relative z-20 top-0 left-0 h-full bg-gray-900 transition-all duration-300 ease-in-out flex flex-col items-start ${value.extended ? 'w-[210px]' : 'w-0 sm:w-[70px]'} overflow-hidden sm:overflow-visible`}>

        {/* hamburger icon */}
        <div onClick={handleHamburger} className='hamburger invert absolute top-7 left-4 cursor-pointer'>
          <img className='w-6' src={assets.menu_icon} alt=" menu icon" />
        </div>

        {/* new chat icon */}
        <div onClick={handleNewChat} className="chatIcon w-27 absolute top-18 left-4 flex gap-2 px-1 rounded-3xl filter invert cursor-pointer">
          <img className=' w-5 h-6' src={assets.plus_icon} alt="plus icon" />
          <span style={{ display: value.extended ? "" : "none" }} >New Chat</span>
        </div>

        {/* recent */}
        <div className="recent px-1 mt-30 ">
          <p style={{ display: value.extended ? "" : "none" }} className='font-semibold hover:bg-gray-950 rounded-3xl pl-3 pr-3 w-19 text-lg text-gray-300'>Recent</p>
          <ul style={{ display: value.extended ? "" : "none", }} className='px-1 py-1 text-lg text-gray-200'>
            {
              value.recent.map((elem, index) => {
                return <div key={index} className='flex w-[170px] items-center relative '>
                  <li className='w-[85%] overflow-x-hidden truncate px-1 pl-2 rounded-3xl relative text-nowrap hover:bg-gray-950 cursor-pointer' onClick={() => runPreviousFunc(index)}>{elem}</li>
                  {/* absolute right-2 */}
                  <img className='absolute right-1 cursor-pointer rounded-full hover:bg-gray-950' onClick={() => toggleMenuFunc(index)} src={assets.more_vert_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24} alt="options-icon" />

                  {/* dropdownMenu  */}
                  {toggleMenu === index && (
                    <div className="drpodownMenu absolute bottom-5 right-2 px-3 py-2 bg-gray-700 rounded-xl shadow-md z-10">
                      <div onClick={() => handleDelete(index)} className="delete cursor-pointer">Del</div>
                      <div onClick={() => handleEdit(index)} className="edit cursor-pointer">edit</div>
                    </div>
                  )}
                </div>
              })
            }
          </ul>
        </div>

        <div className='bottom'>
          <div className="chatIcon flex flex-row gap-2 absolute bottom-7 left-5 font-semibold text-lg text-gray-300">
            <img className='h-6 w-6  invert' src={assets.setting_icon} alt="setting-icon" />
            <p style={{ display: value.extended ? "" : "none" }}>Settings</p>
          </div>
        </div>
      </div >
    </ >
  )
}

export default Sidebar
