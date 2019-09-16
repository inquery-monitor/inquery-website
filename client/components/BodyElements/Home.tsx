import React from 'react'


function Home(props){
  return (
    <div className='main-body'>
  <img src = './assets/inquery_logo.png' id = 'graph-ql'></img>
  <h3 id = 'main-description'>inQuery</h3>
  <h3 id = 'sub-description'>Realtime GraphQL endpoint analytics.</h3>
  <div id = 'action-buttons-wrapper'>
    <button className = 'action-btns' onClick={()=>{props.updateTab('Documentation')}}> Get Started </button>
    <button className = 'action-btns'><a href = 'https://github.com/inquery-monitor/inquery-monitor-npm'> &#9733; us on Github!</a> </button>
  </div>
</div>
  )
}


export default Home