import React, { useState } from 'react';
import Modal from '../Modal'

function Login() {
  const [isShown, flipModal] = useState(false);
  const hide = () => flipModal(false);
  const show = () => flipModal(true);
  const modalStatus = isShown ? 'show' : 'hide'
    return(
      <div className = 'login-body'>
        <div className='login-wrapper'>
          <input type = 'text' name = 'accessID' className = 'input-form'placeholder = 'AccessID'/>
          <input type = 'password' name = 'accessKey' className = 'input-form' placeholder = 'AccessKey'/>
          <button id="login-button">Login</button>
          <button id = 'request-key' onClick={show}>Request API Access ID/Key</button>
          <Modal status={isShown}/>
        </div>
      </div>
    )
  }



export default Login