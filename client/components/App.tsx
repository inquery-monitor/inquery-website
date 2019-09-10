import React, {useState} from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import Modal from './Modals/Modal';



export default function App() {
  const [currentTab, updateTab] = useState('Home');
  

  return (
    <div id='main-wrapper'>
<<<<<<< HEAD
    <Header updateTab = {updateTab}/>
    <Body currentTab = {currentTab}/>
    <Footer/>
    <Modal></Modal>
=======
      <Header updateTab = {updateTab} currentTab = {currentTab}/>
      <Body currentTab = {currentTab}/>
      <Footer/>
>>>>>>> master
    </div>
  )
}
