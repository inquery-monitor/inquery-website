import React from 'react';
import ProfileCard from '../ProfileCard';

function About(){

  const profiles = [
    {name: 'Andrew Tang',
     description: 'Software Engineer | UCLA',
     image:'../assets/atang.jpg'
    },
    {
     name: 'Billy Lee',
     description: 'Software Engineer | UCSB',
     image:'../assets/blee.jpg'
    },
    {
      name: 'Justin Fung',
      description: "Software Engineer | UC Berkeley",
      image:'../assets/jfung.jpg'
     },
    {
     name: 'Soroush Alimdari',
     description: 'Software Engineer | AWS-Certified',
     image:'../assets/soroush.png'
    }
  ]

  const profileCards = profiles.map((profile,idx)=> {
    return <ProfileCard name= {profile.name} description = {profile.description}img = {profile.image} key = {idx}/>
  })


  return(
    <div className = 'about-body'>
      <div id = 'about-wrapper'>
        <div id='about-title'>
         <span style={{color:'white', fontWeight:300}}>GraphQL with </span> <span style={{fontSize: '1.2em'}}>inQuery</span>
        </div>
        <p id = 'about-text'>
        inQuery is an open-source GraphQL monitoring/analytics tool aimed to improve the ecosystem around GraphQL. 
        Monitoring a GraphQL endpoint can be difficult, and costly; this is why our team decided to open source a product and make it available to the developer community. 
          <br /><br /> 
          With inQuery, developers can track their resolvers speed, time, and execution counts to see where the bottle neck in their applications are coming from. Currently we are in BETA release, and we are looking for any feedback to improve our product! 
        </p>
      </div>
      <h2>The Team</h2>
      <div id = 'team-wrapper'>
      {profileCards}
      </div>
    </div>
  )
}

export default About