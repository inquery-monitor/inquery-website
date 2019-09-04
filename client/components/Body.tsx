import React from 'react'

export default function Body() {
  return (
    <div className='main-body'>
      <img src = 'https://raw.githubusercontent.com/rohan-varma/rohan-blog/gh-pages/images/graphql.png' id = 'graph-ql'></img>
      <h3 id = 'main-description'>Goblin Monitor. Monitor your GraphQL endpoint.</h3>
      <div id = 'action-buttons-wrapper'>
        <button className = 'action-btns'> Get Started </button>
        <button className = 'action-btns'> Docs </button>
      </div>
    </div>
  )
}