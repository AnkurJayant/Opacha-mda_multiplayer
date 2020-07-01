import React from 'react'
import './Planet.css'
import shieldLogo from '../shield.jpg'
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
            buttonsVisibleA:"hidden",     
            buttonsVisibleB:"hidden"     
        }
        this.powerInc=this.powerInc.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleMode=this.handleMode.bind(this)
        this.resetFocus=this.resetFocus.bind(this)
    }
    
    componentDidMount(){        
        this.setState({            
            x:this.props.x,
            y:this.props.y,
            id:this.props.id,
            active:this.props.active  ,     
            inFocus:!this.props.inFocus              
        })                 
        this.interval=setInterval(()=>this.powerInc(),1000)
    }    
    componentDidUpdate(){

    }
    powerInc(){
        if(this.state.mode==="hasten")
        {
            clearTimeout(this.interval)
            this.interval=setInterval(()=>this.powerInc(),500)   
            this.setState(prevState=>({
                power:prevState.power+1,                                
            }))         
            
        }else {
            clearTimeout(this.interval)
            this.interval=setInterval(()=>this.powerInc(),1000)   
            this.setState(prevState=>({
                power:prevState.power+1,                
            }))
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    handleClick=()=>{
        this.setState(prevState=>({
            inFocus:prevState.active ? (!prevState.inFocus): prevState.inFocus,
            radius:prevState.inFocus ? prevState.active ? prevState.radius+1 : prevState.radius  : prevState.active ? prevState.radius-1 : prevState.radius,
            buttonsVisibleA: prevState.inFocus ? prevState.active ? prevState.mode==="hasten" ? "hidden" : "visible" : "hidden":"hidden",
            buttonsVisibleB: prevState.inFocus ? prevState.active ? prevState.mode==="shield" ? "hidden" : "visible" : "hidden":"hidden",
        }))                
        
    }

    handleMode(Mode,id){
        this.setState(prevState=>({
            mode:Mode,
            inFocus:!prevState.inFocus,            
            radius:prevState.inFocus ? prevState.radius+1 : prevState.radius-1                     ,
            buttonsVisibleA: prevState.inFocus ? prevState.active ? prevState.mode==="hasten" ? "hidden" : "visible" : "hidden":"hidden",
            buttonsVisibleB: prevState.inFocus ? prevState.active ? prevState.mode==="shield" ? "hidden" : "visible" : "hidden":"hidden",
        }))

    }
    resetFocus(){
        this.setState({inFocus:false})
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
            visibilityA:this.state.buttonsVisibleA,
            visibilityB:this.state.buttonsVisibleB
        }
        
        return(          
            <g>

                <image 
                    x={(buttonStyles.X*2/3)}
                    y={buttonStyles.Y-82}    
                    width="30" height="30" 
                    href={shieldLogo} visibility={buttonStyles.visibilityB}
                    onClick={()=>this.handleMode("shield",this.state.id)}/>
                <circle 
                        cx={(buttonStyles.X*2/3+15)}
                        cy={buttonStyles.Y-41-28}
                        r = {styles.planetRadius+2} 
                        fill = "transparent" 
                        stroke="#acb4b6"     
                        visibility={buttonStyles.visibilityB}                     
                        onClick={()=>this.handleMode("shield",this.state.id)}
                    ></circle>
                    
                    
                    <text x={(buttonStyles.X/3)-35} y={buttonStyles.Y-60}
                        textAnchor="middle" 
                        visibility={buttonStyles.visibilityA}
                        onClick={()=>this.handleMode("hasten",this.state.id)}
                        fontSize="24px"
                        >$
                    </text>                                                                                                 
                    <circle 
                        cx={(buttonStyles.X/3)-35} cy={buttonStyles.Y-68}
                        r = {styles.planetRadius+2} 
                        fill = "transparent" 
                        stroke="#acb4b6"     
                        visibility={buttonStyles.visibilityA}                     
                        onClick={()=>this.handleMode("hasten",this.state.id)}
                    ></circle>
                    <circle 
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius+2} 
                        fill = "#525576" 
                        stroke="#acb4b6"  
                        strokeDasharray="5,5"
                        visibility= {!this.state.inFocus ? "visible" : "hidden"}
                        onClick={this.handleClick}
                        ></circle>
                    
                    <circle 
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius} 
                        fill = {styles.backgroundColor} 
                        onClick={this.handleClick}
                        
                    ></circle>    

                    <circle 
                        className="path"
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius-4}                         
                        stroke="#606060"  
                        strokeDasharray="4,10"    
                        strokeWidth="2"                    
                        style={{animation:`hasten 1s infinite`}}                        
                        fill="transparent"
                        visibility={this.state.mode === "hasten" ? "visible" : "hidden"}
                        onClick={this.handleClick}
                    ></circle>
                    <circle 
                        className="path"
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius-4}                         
                        stroke="#606060"  
                        strokeDasharray="5,2"    
                        strokeWidth="3"                    
                        style={{animation:`shield 1s infinite`}}                        
                        fill="transparent"
                        visibility={this.state.mode === "shield" ? "visible" : "hidden"}
                        onClick={this.handleClick}
                    ></circle>
                    <text x={styles.textX} y={styles.textY} textAnchor="middle" fontSize="12px" onClick={this.handleClick}>                                                
                        {                    
                            this.props.active ? this.state.power : 3
                        }                    
                    </text>
                </g>  
        )
    
    }
}
export default Planet