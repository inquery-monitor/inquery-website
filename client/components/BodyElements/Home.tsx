import React from 'react'


function Home(){
  return (
    <div className='main-body'>
  <img src = 'https://raw.githubusercontent.com/rohan-varma/rohan-blog/gh-pages/images/graphql.png' id = 'graph-ql'></img>
  <h3 id = 'main-description'>GoblinQL Monitor Asshole</h3>
  <h3 id = 'sub-description'>Monitor your GraphQL endpoint.</h3>
  <div id = 'action-buttons-wrapper'>
    <button className = 'action-btns'> Get Started </button>
    <button className = 'action-btns'> Docs </button>
  </div>
</div>
  )
}


export default Home