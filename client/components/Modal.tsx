import React from 'react';

interface ModalProps {
  status: boolean;
}

function Modal(props: ModalProps) {
const modalStatus = props.status ? 'show' : 'hide'
console.log('re-render')
if (modalStatus === 'show'){
  // make request to create accessID and key from back-end && display on user.. using UseEffect?
}
return(
  <div className={"modal " + modalStatus}>
    Your Api key is ...
  </div>
)

}



export default Modal