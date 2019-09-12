import React from 'react';


function Community(){
  // init an object to hold our community info.
  const communityInfo: Array<object> = [
    {
      'title': 'GitHub',
      'textHTML': 'GoblinQL Monitor is in active development.  Check out <a class=\'link\' href=\'https://github.com/goblin-monitoring-graphql/\'>the repository</a> at GitHub.com.'
    }
  ];

  // Build an array of JSX components from the data.
  const communityElements = communityInfo.map((community: object, idx: number) => {
    return (
      <div className='community' id={'community-'+idx} key={idx}>
        <div className='community-title'>{community['title']}</div>
        <div className='community-text'
             dangerouslySetInnerHTML={{ __html: community['textHTML']}}>
        </div>
      </div>
    )
  })

  // Community component renders the following.
  return (
    <div className='community-body'>
      <div className='community-wrapper'>
        {communityElements}
      </div>
    </div>
  )
}


export default Community