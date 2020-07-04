import React from 'react'
import Planet from './Planet'
import Path from './Path'

class Draw extends React.Component{    
    constructor(){
        super()
        this.flag1=-1;  
        this.flag2=this.flag1;  
        this.state={            
             color:["#87da97","#da868e","#d7da87","#4FC3F7"],
             count:0,
             visible:"hidden",             
             planetComponents:[],
             pathComponents:[],
             sender:-1,
             reciever:-1,
             inFocus:-1,
             powerInFocus:-1,
             inFocusState:false,
             gridStyle:{
                height:610,
                width:510,
                background:"#525576",
            }
        }      
        this.getID=this.getID.bind(this)
        this.setFocus=this.setFocus.bind(this)    
        this.makePlanets=this.makePlanets.bind(this)
        this.setPower=this.setPower.bind(this)
        this.updatePower=this.updatePower.bind(this)
        this.makeTransaction=this.makeTransaction.bind(this)
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
        // console.log("componenetDidMount")
            let P1Cors;let P2Cors;
            this.makePlanets()             
            let pathKey=0;
            let pathComponents=this.props.connections.map(path=>{            
                P1Cors=this.getPCor(path.p1)
                P2Cors=this.getPCor(path.p2)
                return(<Path key={pathKey++}x1={P1Cors.x} y1={P1Cors.y} x2={P2Cors.x} y2={P2Cors.y}/>)
            })        
            this.setState({pathComponents:pathComponents})                
    }
    
    makePlanets=()=>{   
        // console.log("make planets")    
        let colorIndex=0;let planetKey=0;                
        let planetComponents=this.props.planets.map(planet=>
            <Planet          
                setPower={this.setPower} 
                inFocusID={this.state.inFocus}
                updatePower={this.updatePower}
                power={-1}           
                handleTransaction={this.handleTransaction}
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
                key={planetKey++}
            />)
            this.setState({planetComponents:planetComponents})                
    }
    setFocus=(id)=>{
        //once the focus has been set to true , planet at this id should become the sender
        // console.log("setFocus",id)
        let infocusTemp, inFocusStateTemp
        if(this.state.inFocus===id){
            infocusTemp=this.state.inFocusState ? -1 : id 
            inFocusStateTemp=!this.state.inFocusState
        }else{
            infocusTemp=id
            inFocusStateTemp=true                
        }
        console.log("planet in focus:",infocusTemp)
        let colorIndex=0;let planetKey=0;
        let planetComponents=this.props.planets.map(planet=>
            <Planet 
            inFocusID={infocusTemp}
            updatePower={this.updatePower}
            setPower={this.setPower}
            power={-1}
            handleTransaction={this.handleTransaction}
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
            key={planetKey++}
            />)
//it can be a sender only if:
//it's active
//no other planet in adjacent is in focus
//it wasn't previously a sender

//it can be a reciever only if:
//it need not to be active
//there should be a sender in adjacent

        this.setState({
            planetComponents:planetComponents,
            inFocus:infocusTemp,
            inFocusState:inFocusStateTemp,
            sender:this.state.inFocus === -1 ? id : !this.isAdjacent(id,this.state.inFocus) ? this.state.sender !== id ? id : -1 : this.state.inFocus,
            reciever:this.isAdjacent(this.state.inFocus,id) ? id : -1
        },()=>this.state.sender!==-1 ? this.state.reciever!==-1 ? this.makeTransaction(this.state.sender,this.state.reciever) :console.log():console.log() )            
    }
        
    resetFocus=()=>{   
        if(this.state.inFocus !== -1 && this.flag1 === this.flag2){                                                            
            if(this.state.inFocusState)
            {
                this.setState({                    
                    inFocusState:false,
                    sender:-1,
                    inFocus:-1
                },()=>this.makePlanets())                                                                                
                console.log("Focus resetted")
        
            }
//            console.log(this.state.inFocus,this.state.inFocusState)
        }
        else{
            this.flag1=this.flag2
        }
    }
    isAdjacent=(id1,id2)=>{
        let possibleEdgeA={
                "p1":id1,
                "p2":id2
        }
        let possibleEdgeB={
            "p1":id2,
            "p2":id1
        }
        let possible=false
        this.props.connections.map(edge=>{            
            return (edge.p1===possibleEdgeA.p1 && edge.p2===possibleEdgeA.p2 ? possible=true : edge.p1===possibleEdgeB.p1 && edge.p2===possibleEdgeB.p2 ? possible=true : console.log())
        })
        return(possible) 
    }
    makeTransaction=(S,R)=>{
        this.setState({inFocus:-1},()=>this.makePlanets())
        console.log("Transaction of ",this.state.powerInFocus," from:",S,"to",R)
        // this.setState({inFocus:-1},()=>{
        //     let colorIndex=0;let planetKey=0;
        //     let setpower= this.state.powerInFocus
        //     console.log("power is:",setpower)
        //     let planetComponents=this.props.planets.map(planet=>
        //     <Planet          
        //         setPower={this.setPower} 
        //         inFocusID={this.state.inFocus}
        //         updatePower={this.updatePower}
                
        //         power={planet.id===S ? 777 : planet.id===R ? 222 : -1}                          

        //         handleTransaction={this.handleTransaction}
        //         permit={this.permit}
        //         inFocus={false} 
        //         setFocus={this.setFocus} 
        //         gridStyle={this.state.gridStyle} 
        //         x={planet.x} 
        //         y={planet.y} 
        //         id={planet.id}  
        //         active={planet.active} 
        //         color={planet.active ? this.state.color[colorIndex++]:"#acb4b6"} 
        //         getID={this.getID}
        //         key={planetKey++}
        //     />)
        //     this.setState({planetComponents:planetComponents})                            
        // })
    }
    handleTransaction=(couldBeAReciever)=>{
        // console.log("handleTransaction")
        if(this.isAdjacent(couldBeAReciever,this.state.inFocus) ){            
            this.makeTransaction(this.state.sender,couldBeAReciever)
        }else{
            console.log("Not happening")
        }
    }
    setPower(power,id){
        // console.log("calling setPower")
        this.makePlanets(power,id,true)
    }
    updatePower(power){
        if(power){
        this.setState({powerInFocus:power})
        
        }
    }
    

    permit=()=>{      
        // console.log("permit")
        //a function which permits if resetFocus should be called or not. resetFocus is called only if this function is called   
        this.flag2++;
    }
    
    getID=()=>{
        return(this.state.inFocus)
    }


    render(){         
//        console.log("Draw_infocusID",this.state.inFocus)       
//       console.log("render's:",this.state.sender)
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