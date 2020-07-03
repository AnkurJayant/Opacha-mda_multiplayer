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
             planetComponents:[],
             pathComponents:[],
             inFocus:-1,
             inFocusState:false,
             gridStyle:{
                height:610,
                width:510,
                background:"#525576",
            }
        }      
        this.flag1=-1;  
        this.flag2=this.flag1;  
        this.getID=this.getID.bind(this)
        this.setFocus=this.setFocus.bind(this)    
    }

    getPCor(p){
        for(let i=0;i<this.props.planets.length;i++){
            if(this.props.planets[i].id===p)
            {                
                return({x:this.props.planets[i].x,y:this.props.planets[i].y})
            }
        }               
    }
    componentDidMount(){    
            let colorIndex=0;let P1Cors;let P2Cors
            let planetComponents=this.props.planets.map(planet=>
            <Planet 
                permit={this.permit}
                inFocus={this.state.inFocusState} 
                setFocus={this.setFocus} 
                gridStyle={this.state.gridStyle} 
                x={planet.x} 
                y={planet.y} 
                id={planet.id}  
                active={planet.active} 
                color={planet.active ? this.state.color[colorIndex++]:"#acb4b6"} 
                getID={this.getID}
            />)            
            let pathComponents=this.props.connections.map(path=>{            
                P1Cors=this.getPCor(path.p1)
                P2Cors=this.getPCor(path.p2)
                return(<Path x1={P1Cors.x} y1={P1Cors.y} x2={P2Cors.x} y2={P2Cors.y}/>)
            })        
            this.setState({planetComponents:planetComponents,pathComponents:pathComponents})                
        }
        setFocus=(id)=>{

                if(this.state.inFocus===id){
                    this.setState({inFocus:this.state.inFocusState ? -1 : id ,inFocusState:!this.state.inFocusState})    
                }else{
                    this.setState({inFocus:id,inFocusState:true})
                    
                }
                let colorIndex=0
                let planetComponents=this.props.planets.map(planet=>
                <Planet 
                    permit={this.permit}
                    inFocus={planet.id === id ? this.state.inFocus===id ? !this.state.inFocusState : true : false} 
                    setFocus={this.setFocus} 
                    gridStyle={this.state.gridStyle} 
                    x={planet.x} 
                    y={planet.y} 
                    id={planet.id}  
                    active={planet.active} 
                    color={planet.active ? this.state.color[colorIndex++]:"#acb4b6"} 
                    getID={this.getID}
                />)
                this.setState({planetComponents:planetComponents})                
        }
    permit=()=>{      
        //a function which permits if resetFocus should be called or not. resetFocus is called only if this function is called   
        this.flag2++;
    }
    getID=()=>{
        return(this.state.inFocus)
    }
    resetFocus=()=>{   
        if(this.state.inFocus !== -1 && this.flag1 === this.flag2){
            console.log("info")
            console.log(this.state.inFocus)            
            // let planetComponents=this.state.planetComponents;
            // let planetComponent=
            // <Planet 
            //     inFocus={false} 
            //     setFocus={this.setFocus} 
            //     gridStyle={this.state.gridStyle} 
            //     x={this.props.planets[this.state.inFocus].x} 
            //     y={this.props.planets[this.state.inFocus].y} 
            //     id={this.props.planets[this.state.inFocus].id}  
            //     active={this.props.planets[this.state.inFocus].active} 
            //     color={"pink"} 
            //     getID={this.getID}
            // />            
            // planetComponents[this.state.inFocus]=planetComponent            
            // console.log(planetComponents)
            //    this.setState({
            //     inFocus:-1,
            //     inFocusState:false,    
            //     planetComponents:planetComponents
            // })
            // }                        
            let colorIndex=0
            if(this.state.inFocusState)
            {
                let planetComponents=this.props.planets.map(planet=>
                    <Planet 
                        permit={this.permit}
                        inFocus={false} 
                        setFocus={this.setFocus} 
                        gridStyle={this.state.gridStyle} 
                        x={planet.x} 
                        y={planet.y} 
                        id={planet.id}  
                        active={planet.active} 
                        color={planet.active ? this.state.color[colorIndex++]:"#acb4b6"} 
                        getID={this.getID}
                    />)
                this.setState({
                    planetComponents:planetComponents,
                    inFocusState:false
                })
                
            }
            console.log(this.state.inFocus,this.state.inFocusState)
        }
        else{
            this.flag1=this.flag2
        }
    }
    render(){                
        return(
            <div>        
                <svg style={this.state.gridStyle }  onClick={this.resetFocus}>                    
                    {this.state.pathComponents}                                        
                    {this.state.planetComponents}
                </svg>            
            </div>
        )
    }
}

export default Draw