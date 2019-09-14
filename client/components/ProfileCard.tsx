import React from 'react';


function ProfileCard(props){
  const {name, description, img} = props
  return(
    <div className = 'profile-card'>
      <div className = 'profile-image-wrapper'>
      <img className = 'profile-pic' src = {img}></img>
      </div>
      <div className = 'profile-description'>
      <h3>{name}</h3>
      {description}
      </div>
      
    </div>
  )
};


export default ProfileCard