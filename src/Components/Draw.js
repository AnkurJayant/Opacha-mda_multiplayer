import React from 'react'
import Planet from './Planet'
import Path from './Path'

class Draw extends React.Component{
    constructor(){
        super()
        this.state={
             color:["#87da97","#da868e","#d7da87","#4FC3F7"],
             count:0,
             visible:"hidden",
             inFocusIDs:[55,11]
        }
        this.handleClick=this.handleClick.bind(this)
    }
    getPCor(p){
        for(let i=0;i<this.props.planets.length;i++){
            if(this.props.planets[i].id===p)
            {                
                return({x:this.props.planets[i].x,y:this.props.planets[i].y})
            }
        }               
    }

    handleClick=(id)=>{
        let inFocusIDsArray=this.state.inFocusIDs
        this.setState({inFocusIDs:inFocusIDsArray.push(id)})
        console.log(this.state.inFocusIDs)
        return this.state.inFocusIDs
    }

    render(){                
        const gridStyle={
            height:610,
            width:510,
            background:"#525576",

        }
        let colorIndex=0
        let planetComponents=this.props.planets.map(planet=><Planet gridStyle={gridStyle} x={planet.x} y={planet.y} id={planet.id}  active={planet.active} color={planet.active ? this.state.color[colorIndex++]:"#acb4b6"} />)
        let pathComponents=this.props.connections.map(path=>{            
            let P1Cors=this.getPCor(path.p1)
            let P2Cors=this.getPCor(path.p2)
            return(<Path x1={P1Cors.x} y1={P1Cors.y} x2={P2Cors.x} y2={P2Cors.y}/>)
        })
        console.log(pathComponents)
        return(
            <div >        
                <svg style={gridStyle} >                    
                    {pathComponents}                                        
                    {planetComponents}
                </svg>            
            </div>
        )
    }
}

export default Draw