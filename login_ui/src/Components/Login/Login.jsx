import React, { useState } from 'react'
import './Login.css'

const Login = () => {

  return (
    <div className='container'>
        <div className="header">
            <div className="text">Log In</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <input type="User ID" placeholder="User ID"/>
            </div>
            <div className="input">
                <input type="Password" placeholder="Password"/>
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Submit</div>
        </div>
    </div>
  )
}

export default Login