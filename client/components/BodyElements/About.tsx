import React from 'react';


function About(){
  return(
    <div className = 'about-body'>
      <div id = 'about-wrapper'>
        <p id = 'about-text'>Goblin Monitor is an open-source GraphQL monitoring/analytics tool created in 2019 aimed to improve the developer experience around GraphQL.
        While GraphQL solves the underfetching and overfetching problem and has this distinct advantage over REST, tradiational restful architecture innately
        contains predictability, as each endpoint specifically responds.
        </p>
      </div>
    </div>
  )
}

export default About