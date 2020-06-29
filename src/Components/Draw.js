import React from 'react'
import Planet from './Planet'
import Path from './Path'
class Draw extends React.Component{
    constructor(){
        super()
        this.state={
             color:["#87da97","#da868e","#d7da87","#4FC3F7"],
             count:0
        }
        this.colorRand=this.colorRand.bind(this)
    }
    getPCor(p){
        for(let i=0;i<this.props.planets.length;i++){
            if(this.props.planets[i].id===p)
            {                
                return({x:this.props.planets[i].x,y:this.props.planets[i].y})
            }
        }               
    }
    colorRand(){
                let randId
                let color=this.state.color        
                let randColor=color[randId=Math.floor(Math.random()*color.length)]                
                randId=color.indexOf(randColor)            
                color.splice(randId,1)                                                                                            
                return(randColor)
    }

    render(){                
        const gridStyle={
            height:1000,
            width:1000,
            background:"#525576"
        }
        let planetComponents=this.props.planets.map(planet=><Planet x={planet.x} y={planet.y} id={planet.id} active={planet.active} color={planet.active ? this.colorRand():"#acb4b6"}/>)
        let pathComponents=this.props.connections.map(path=>{            
            let P1Cors=this.getPCor(path.p1)
            let P2Cors=this.getPCor(path.p2)
            return(<Path x1={P1Cors.x} y1={P1Cors.y} x2={P2Cors.x} y2={P2Cors.y}/>)
        })
        console.log(pathComponents)
        return(
            <div >        
                <svg style={gridStyle}>
                    {pathComponents}
                    {planetComponents}
                </svg>            
            </div>
        )
    }
}

export default Draw