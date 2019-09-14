import React from 'react';



function Documentation(){
  return(
    <div className = 'documentation-body'>
      <div id = 'documentation-wrapper'>
        <h3 className = 'documentation-h3' style={{'font-size': '1.5em'}}>Getting started guide</h3>
        <p className = 'documentation-text'><i>Note: The current version of inQuery is only compatible with Apollo Server and GraphQL Yoga.</i></p> 
        <h3 className = 'documentation-h3'>Step 1: Download our package on NPM.</h3>
          <div className = 'code-snippet'>
            <p className = 'code-text'>npm i --save-dev inquery-monitor</p>
          </div>
        <h3 className = 'documentation-h3'>Step 2: Extract functions from the module.   </h3>
          <div className = 'code-snippet'>
            <p className = 'code-text'><span style={{color:'rgb(175, 81, 188)'}}>const</span> &#123; <span style = {{color:'rgb(228, 69, 113)'}}>enableMonitoring</span>, <span style = {{color:'rgb(228, 69, 113)'}}>trackErrors</span> &#125;  =  <span style = {{color:'rgb(228, 69, 113)'}}>require</span>('inquery-monitor')</p>
          </div>
        <h3 className = 'documentation-h3'>Step 3: Pass in your resolvers as the first argument to enableMonitoring.</h3>
          <div className = 'code-snippet'>
          <p className = 'code-text'><span style={{color:'rgb(175, 81, 188)'}}>const</span> <span style = {{color:'rgb(228, 69, 113)'}}>updatedResolvers</span> = <span style = {{color:'#47a2f0'}}>enableMonitoring</span>(resolvers <span style={{color:'rgb(171, 171, 171)'}}>[, optional apiKey]</span>)</p>
          </div>
        <h3 className = 'documentation-h3'>Step 4: Start Apollo-Server with updatedResolvers passed in.</h3>
          <div className = 'code-snippet'>
          <p className = 'code-text'><span style={{color:'rgb(175, 81, 188)'}}>const</span> <span style = {{color:'rgb(228, 69, 113)'}}>server</span> = <span style = {{color:'rgb(175, 81, 188)'}}>new</span> <span style = {{color:'rgb(249, 193, 37)'}}>ApolloServer</span>(&#123; typeDefs, updatedResolvers &#125;)</p>
          <p className = 'code-text'>server.<span style = {{color: '#47a2f0'}}>listen</span>( ).<span style = {{color: '#47a2f0'}}>then</span>( &#123; <span style={{color:'rgb(228, 69, 113)'}}>url</span> &#125; ) <span style={{color:'rgb(175, 81, 188)'}}>&rArr;</span> &#123; <span style = {{color:'rgb(175, 81, 188)'}}>console</span>.<span style = {{color:'#47a2f0'}}>log</span>(`<span style = {{color: '#e6e36a'}}>Server is listening at</span> &#123; <span style={{color:'rgb(228, 69, 113)'}}>url</span> &#125;` )&#125;) </p>
          </div>
      </div>
    </div>
  )
}


export default Documentation

