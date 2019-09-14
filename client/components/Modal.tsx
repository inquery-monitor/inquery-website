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

  <div className = {"modal " + modalStatus}>
  <p style = {{fontSize: 14, color: '#ababab'}}>AccessID----{accessId}</p>
  <p style = {{fontSize: 14, color: '#47a2f0'}}>AccessKey----{apiKey}</p>
  </div>
)

}



export default Modal