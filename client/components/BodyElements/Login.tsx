import React, { useState, useEffect } from 'react';
import Modal from '../Modal'

function Login() {
  const [isShown, flipModal] = useState(false);
  const [apiData,updateData] = useState({apiKey:'',accessId:''})
  const [accessID,updateAccessId] = useState('')
  const [apiKey,updateApiKey] = useState('')

  const hide = () => flipModal(false);
  const showAndFetch = () => {
    fetch('/requestApiKey')
    .then((keys)=>keys.json())
    .then((jsonKeys)=>{
      updateData(jsonKeys)
       flipModal(true)
    })
    // make a fetch request here to our server. 
    };
  
  const updateAccessDetails = (e) => {
    updateAccessId(e.target.value)
  }

  const updateApiKeyDetails = (e) => {
    updateApiKey(e.target.value)
  }
  const login = (accessID,apiKey) => {
    console.log('logging in')
    fetch('/checkApiKey', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({accessId: accessID, apiKey: apiKey})
    })
    .then((response)=>{
        if (response.status === 301){
          document.location.replace('/analytics')
        }
    })
    .catch((e)=>{
      console.log(e)
    })
    
  }

  console.log(accessID, apiKey);
  const modalStatus = isShown ? 'show' : 'hide'
    return(
      <div className = 'login-body'>
        <div className='login-wrapper'>
          <input type = 'text' name = 'accessID' className = 'input-form'placeholder = 'AccessID' onChange={updateAccessDetails}/>
          <input type = 'password' name = 'accessKey' className = 'input-form' placeholder = 'AccessKey' onChange = {updateApiKeyDetails}/>
          <button id="login-button" onClick = {()=>login(accessID,apiKey)}>Login</button>
          <button id = 'request-key' onClick={showAndFetch}>Request API Access ID/Key</button>
          <Modal status={isShown} apiData = {apiData}/>
        </div>
      </div>
    )
  }



export default Login