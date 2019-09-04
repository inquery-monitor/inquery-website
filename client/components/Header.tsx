import React from 'react'

export default function Header() {
  const headerTabs = ['Home','About','Documentation','Contact'].map((title)=> {
    return (<h3 className = 'header-item'>{title}</h3>)
  })


  return (
    <div className='header'>
      {headerTabs}
    </div>
  )
}