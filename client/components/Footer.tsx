import React from 'react'

export default function Footer(props: Object) {
  const footerItems = ['Github', 'Team'].map((footerItem,id) => {
    return (
      <p className = 'footer-item' key = {id+footerItem}>
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