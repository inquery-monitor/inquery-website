import React from 'react'

export default function Footer(props: Object) {
  const footerItems = [
    ['Github',"https://github.com/inquery-monitor/inquery-monitor-npm"],
    ['Team', ""]
  ].map( (footerItem,id) => {
    return (
      <a href={footerItem[1]} style={{"textDecoration": "none"}}>
        <p className = 'footer-item' key = {id+footerItem[0]}>
          {footerItem[0]}
        </p>
      </a>
    )
  })
  return (
    <div className='footer'>
      {footerItems}
    </div>
  )
}