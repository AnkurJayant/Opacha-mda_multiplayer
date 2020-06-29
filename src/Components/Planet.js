import React from 'react'

class Planet extends React.Component{
    constructor(){
        super()
        this.state={
            x:0,
            y:0,    
            power:3,       
            id:0,
            active:false, /*denotes if it's a player or a dead planet */
            color:"",
            mode:"normal",
            inFocus:true,
            radius:15,
            visible:"hidden"     
        }
        this.powerInc=this.powerInc.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleMode=this.handleMode.bind(this)
    }
    
    componentDidMount(){        
        this.setState({            
            x:this.props.x,
            y:this.props.y,
            id:this.props.id,
            active:this.props.active            
        })                 
        this.interval=setInterval(()=>this.powerInc(),1000)
    }    
    componentDidUpdate(){

    }
    powerInc(){
        if(this.state.mode==="hasten")
        {
            this.setState(prevState=>({power:prevState.power+2}))
        }else {
            this.setState(prevState=>({power:prevState.power+1}))
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    handleClick=()=>{
        this.setState(prevState=>({
            inFocus:prevState.active? !prevState.inFocus:prevState.inFocus,
            radius:prevState.inFocus ? prevState.active ? prevState.radius+3 : prevState.radius  : prevState.active ? prevState.radius-3 : prevState.radius,
            visible: prevState.inFocus ? prevState.active ? "visible" : "hidden" : "hidden"
        }))                

    }
    handleMode(Mode,id){
        this.setState({mode:Mode,visibile:this.state.visible})

    }

    render(){
        let styles={
            backgroundColor:this.props.color,                        
            textX:(this.state.x*5-0.5),
            textY:(this.state.y*5+4.5),
            Cx:this.state.x*5,
            Cy:this.state.y*5,
            planetRadius:this.state.radius            
        }
        let gridStyle=this.props.gridStyle

        let buttonStyles={
            X:gridStyle.width,
            Y:gridStyle.height,
            visibility:this.state.visible
        }
        return(          
            <g>
                    <rect 
                        x={(buttonStyles.X/3)-35} 
                        y={buttonStyles.Y-60} 
                        width="30" height="30" 
                        stroke="black" 
                        fill="transparent" 
                        stroke-width="2" 
                        visibility={this.state.visible}/>      

                    <text x={buttonStyles.X/3-20} 
                          y={buttonStyles.Y-41} 
                          textAnchor="middle"  
                          visibility={buttonStyles.visibility}
                          onClick={()=>this.handleMode("hasten",this.state.id)}
                        >up
                    </text>                   
                    
                    <rect 
                        x={(buttonStyles.X*2/3)-15} 
                        y={buttonStyles.Y-60} 
                        width="30" height="30" 
                        stroke="black" 
                        fill="transparent" 
                        stroke-width="2" 
                        visibility={this.state.visible}/>                        
                    <text 
                        x={(buttonStyles.X*2/3)}
                        y={buttonStyles.Y-41}    
                        textAnchor="middle" 
                        visibility={this.state.visible}
                        onClick={()=>this.handleMode("shield",this.state.id)}
                        >shield
                    </text>                   
                    
                    
                    <circle 
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius+2} 
                        fill = "#525576" 
                        stroke="#acb4b6"  
                        strokeDasharray="5,5"
                        ></circle>
                    
                    <circle 
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius} 
                        fill = {styles.backgroundColor} 
                    ></circle>    

                    <text x={styles.textX} y={styles.textY} textAnchor="middle" onClick={this.handleClick}>                                                
                        {                    
                            this.props.active? this.state.power : 3
                        }                    
                    </text>
                </g>  
        )
    
    }
}
export default Planet