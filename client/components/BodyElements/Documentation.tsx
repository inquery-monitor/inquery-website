import React from 'react';


function Documentation(){
  return(
    <div className = 'documentation-body'>
      <div id = 'documentation-wrapper'>
        <h3 className = 'documentation-h3' style={{'font-size': '1.5em'}}>Getting started guide</h3>
        <p className = 'documentation-text'><i>Note: The current version of GoblinQL is only compatible with Apollo Server and GraphQL Yoga.</i></p> 
        <h3 className = 'documentation-h3'>Step 1: Download our package on NPM.</h3>
          <div className = 'code-snippet'>
            <p className = 'code-text'>npm i --save-dev goblinql</p>
          </div>
        <h3 className = 'documentation-h3'>Step 2: Extract functions from the module.   </h3>
          <div className = 'code-snippet'>
            <p className = 'code-text'>const &#123; enableMonitoring, trackErrors &#125;  =  require('goblinql')</p>
          </div>
        <h3 className = 'documentation-h3'>Step 3: Pass in your resolvers as the first argument to enableMonitoring.</h3>
          <div className = 'code-snippet'>
          <p className = 'code-text'>const updatedResolvers = enableMonitoring(resolvers)</p>
          </div>
        <h3 className = 'documentation-h3'>Step 4: Start Apollo-Server with updatedResolvers passed in.</h3>
          <div className = 'code-snippet'>
          <p className = 'code-text'>const server = new ApolloServer(&#123; typeDefs, updatedResolvers &#125;)</p>
          <p className = 'code-text'>{'server.listen( ).then( { url } ) => { console.log(`Server is listening at { url }` )})'} </p>
          </div>
      </div>
    </div>
  )
}


export default Documentation