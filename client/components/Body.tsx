import React from 'react'
import Home from './BodyElements/Home'
import About from './BodyElements/About';
import Documentation from './BodyElements/Documentation';
import Contact from './BodyElements/Contact';
import Login from './BodyElements/Login';


interface BodyProps {
  currentTab: string;
}

export default function Body(props: BodyProps) {
  
 

  return (
   <Home/>
  )
}