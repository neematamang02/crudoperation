import React from 'react'
import { useNavigate } from 'react-router-dom'

const Buttons = ({buttonText, className, navigateTo}) => {
    const navigate=useNavigate();

    const handleclick= () => {
        navigate(navigateTo);
    }
  return (
    <button
      className={`${className}`}
      onClick={handleclick}
    >
      {buttonText}
    </button>
  )
}

export default Buttons
