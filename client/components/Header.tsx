import React from 'react'

interface HeaderProps {
  updateTab: (tab:string)=>void
  currentTab: string
}

export default function Header(props: HeaderProps) {
  console.log(props)
  const headerTabs = ['Home','About','Documentation','Community', 'Login'].map((title,id)=> {
    const className = props.currentTab === title ? 'header-item-clicked' : 'header-item'
    return (
      <h3 className = {className}
          key = {title+id} 
          onClick={()=>{props.updateTab(title)}}>
        {title}
      </h3>)
  })


  return (
    <div className='header'>
      {headerTabs}
    </div>
  )
}