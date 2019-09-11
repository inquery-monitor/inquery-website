import React from 'react';


function About(){
  return(
    <div className = 'about-body'>
      <div id = 'about-wrapper'>
        <div id='about-title'>
          GraphQL with Goblin Monitor
        </div>
        <p id = 'about-text'>
          Goblin Monitor is an open-source GraphQL monitoring/analytics tool created in 2019 aimed to improve the developer experience around GraphQL.
          <br /><br />
          Launch the Goblin Monitor from the command line or access it through the web.
          <br /><br />
          In development or during production, view the most important metrics of your GraphQL endpoint in realtime.
        </p>
      </div>
    </div>
  )
}

export default About