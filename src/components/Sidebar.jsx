import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { getContext } from '../App'

function Sidebar() {

  const value = useContext(getContext)
  const [toggleMenu, setToggleMenu] = useState(null)

  // sidebar state


  // hamburger
  function hamdleHamburger() {
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

  // previous question 
  const runPreviousFunc = (indexToBeCalled) => {

    // value.setQuestions(value.recent[indexToBeCalled])   // Now we dont want value in out textfiled
    value.setAskedQuestion(value.recent[indexToBeCalled])
    value.getUser(value.recent[indexToBeCalled])
    value.setShow(true)
  }


  // Function to Toggle Menu 
  function toggleMenuFunc(clickedIndex) {
    console.log(clickedIndex)
    setToggleMenu(prev => prev === clickedIndex ? null : clickedIndex)
    console.log(toggleMenu)
  }

  // functioon to handel delete
  function handleDelete(indexToBeDelete) {
    console.log("delete")
    setToggleMenu(null)
    const newRecent = value.recent.filter((_, index) => index !== indexToBeDelete)
    value.setRecent(newRecent)
    setToggleMenu(false)
    value.setShow(false)
  }

  function handleEdit(indexToEdit) {
    // console.log("edit")
    setToggleMenu(null)
    let selected = value.recent[indexToEdit]
    value.setQuestions(selected)
    value.setSelectedIndex(indexToEdit)
    console.log(value.selectedIndex)
  }

  return (
    <>

      <div className={`sidebarContainer fixed sm:relative z-20 top-0 left-0 h-full bg-gray-900 transition-all duration-300 ease-in-out flex flex-col items-start ${value.extended ? 'w-[200px]' : 'w-0 sm:w-[70px]'}
    overflow-hidden sm:overflow-visible`}
      >

        {/* hamburger icon */}
        <div onClick={hamdleHamburger} className='hamburger invert absolute top-7 left-4'>
          <img className='w-6 ' src={assets.menu_icon} alt=" menu icon" />
        </div>

        {/* new chat icon */}
        <div onClick={handleNewChat} className="chatIcon w-27 absolute top-18 left-4 flex gap-2 px-1 rounded-3xl filter invert ">
          <img className=' w-5 h-6' src={assets.plus_icon} alt="plus icon" />
          <span style={{ display: value.extended ? "" : "none" }} >New Chat</span>
        </div>

        {/* recent */}
        <div className="recent px-1 mt-30 ">
          <p style={{ display: value.extended ? "" : "none" }} className='font-semibold hover:bg-gray-600 rounded-3xl px-1 w-16 text-lg text-gray-300'>Recent</p>
          <ul style={{ display: value.extended ? "" : "none", }} className='px-1 py-1 text-lg text-gray-200'>
            {
              value.recent.map((elem, index) => {
                return <div key={index} className='flex  items-center relative '>
                  <li className='w-38 px-1 rounded-3xl text-nowrap hover:hover:bg-gray-600' onClick={() => runPreviousFunc(index)}>{elem.slice(0, 18) + "..."}</li>
                  {/* absolute right-2 */}
                  <img onClick={() => toggleMenuFunc(index)} src={assets.more_vert_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24} alt="" />

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
