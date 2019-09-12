import React from 'react';


function About(){
  return(
    <div className = 'about-body'>
      <div id = 'about-wrapper'>
        <div id='about-title'>
         <span style={{color:'white', fontWeight:300}}>GraphQL with </span> <span style={{fontSize: '1.2em'}}>inQuery</span>
        </div>
        <p id = 'about-text'>
          inQuery is an open-source GraphQL monitoring/analytics tool created in 2019 aimed to improve the developer experience around GraphQL.
          <br /><br />
          Launch inQuery from the command line or access it through the web.
          <br /><br />
          In development or during production, view the most important metrics of your GraphQL endpoint in realtime.
        </p>
      </div>
    </div>
  )
}

export default About