import React from 'react'

export default function Footer() {
  const footerItems = ['Github', 'Team'].map((footerItem) => {
    return (
      <p className = 'footer-item'>
      {footerItem}
      </p>
    )
  })
  return (
    <div className='footer'>
      {footerItems}
    </div>
  )
}