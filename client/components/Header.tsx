import React from 'react'

interface HeaderProps {
  updateTab: (tab:string)=>void
}

export default function Header(props: HeaderProps) {
  const headerTabs = ['Home','About','Documentation','Contact', 'Log In'].map((title,id)=> {
    return (
      <h3 
      className = 'header-item' 
      key = {title+id} 
      onClick={()=>{props.updateTab(title)}}
      >{title}
      </h3>)
  })


  return (
    <div className='header'>
      {headerTabs}
    </div>
  )
}