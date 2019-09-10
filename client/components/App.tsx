import React, {useState} from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import Modal from './Modals/Modal';



export default function App() {
  const [currentTab, updateTab] = useState('Home');
  

  return (
    <div id='main-wrapper'>
    <Header updateTab = {updateTab}/>
    <Body currentTab = {currentTab}/>
    <Footer/>
    <Modal></Modal>
    </div>
  )
}
