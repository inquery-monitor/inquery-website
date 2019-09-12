import React from 'react'


function Home(){
  return (
    <div className='main-body'>
  <img src = './assets/inquery_logo.png' id = 'graph-ql'></img>
  <h3 id = 'main-description'>inQuery</h3>
  <h3 id = 'sub-description'>Realtime GraphQL endpoint analytics.</h3>
  <div id = 'action-buttons-wrapper'>
    <button className = 'action-btns'> Get Started </button>
    <button className = 'action-btns'> Docs </button>
  </div>
</div>
  )
}


export default Home