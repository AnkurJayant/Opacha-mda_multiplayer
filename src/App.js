import React from 'react'
import Draw from './Components/Draw'
import opacha_level from './Opacha_level.json'
class App extends React.Component{
    render(){
        console.log(opacha_level.planets[0])
        return(
            <Draw planets={opacha_level.planets} connections={opacha_level.edges}></Draw>
        );
    }
}

export default App