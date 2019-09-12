import React from 'react'
import Home from './BodyElements/Home'
import About from './BodyElements/About';
import Documentation from './BodyElements/Documentation';
import Community from './BodyElements/Community';
import Login from './BodyElements/Login';


interface BodyProps {
  currentTab: string;
}

export default function Body(props: BodyProps ) {
  let currentTab;
  switch (props.currentTab) {
    case 'Home': {
      currentTab = <Home/>
      break;
    }
    case 'About': {
      currentTab = <About/>
      break;
    }
    case 'Documentation': {
      currentTab = <Documentation/>
      break;
    }
    case 'Community': {
      currentTab = <Community/>
      break;
    }
    case 'Login': {
      currentTab = <Login/>
      break;
    }
    default: {
      currentTab = <Home/>
      break;
    }
  }



  return (
   currentTab
  )
}