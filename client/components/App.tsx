import React, {useState} from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';



export default function App() {
  const [currentTab, updateTab] = useState('Home');
  

  return (
    <div>
      <Header updateTab = {updateTab} currentTab = {currentTab}/>
      <div id='main-wrapper'>
        <Body currentTab = {currentTab} updateTab = {updateTab}/>
      </div>
      <Footer updateTab = {updateTab}/>
    </div>
  )
}
