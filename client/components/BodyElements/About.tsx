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
          inQuery is an open-source GraphQL monitoring/analytics tool created in 2019 aimed to improve the developer experience around GraphQL.
          <br /><br />
          Launch inQuery in sandbox mode from the command line using the inquery-monitor-local npm module or use it in production through the inquery-monitor module.
          <br /><br />
          In development or during production, view the most important metrics of your GraphQL endpoint in realtime.
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