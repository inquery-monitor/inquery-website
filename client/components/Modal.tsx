import React from 'react';

interface ModalProps {
  status: boolean;
  apiData: {
    apiKey: string,
    accessId: string 
  };
}

function Modal(props: ModalProps) {
const modalStatus = props.status ? 'show' : 'hide'
const { apiKey , accessId } = props.apiData

return(
  <div className = {modalStatus}>
  <p style = {{fontSize: 12, color: 'blue'}}>AccessID = {accessId}</p>
  <p style = {{fontSize: 12, color: 'red'}}>ApiKey = {apiKey}</p>
  </div>
)

}



export default Modal