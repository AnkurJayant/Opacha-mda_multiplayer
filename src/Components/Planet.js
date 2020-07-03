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
            inFocus:false,
            radius:15,
            buttonsVisibleA:"hidden",     
            buttonsVisibleB:"hidden"     
        }
        this.permit=0;
        this.powerInc=this.powerInc.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleMode=this.handleMode.bind(this)
    }
    
    componentDidMount(){        
        this.setState({            
            x:this.props.x,
            y:this.props.y,
            id:this.props.id,
            active:this.props.active,     
            inFocus:this.props.inFocus              
        })                 
        this.interval=setInterval(()=>this.powerInc(),1000)
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
        if(this.state.active){
            this.props.permit(this.permit++)            
            this.props.setFocus(this.state.id)        
            this.setState(prevState=>({            
                buttonsVisibleA:  prevState.mode==="hasten" ? "hidden" : "visible" ,
                buttonsVisibleB:  prevState.mode==="shield" ? "hidden" : "visible" ,
            }))                               
        }
    }
    handleMode(Mode,id){
        console.log(this.props.getID(),this.props.inFocus)
        if(this.state.power>=10)
        {
            this.setState({mode:Mode})
            this.setState(prevState=>({                                
                buttonsVisibleA: prevState.mode==="hasten" ? "hidden" : "visible" ,
                buttonsVisibleB: prevState.mode==="shield" ? "hidden" : "visible" ,
                power:prevState.power-10
            }))
        }
    }

    render(){
        let styles={
            backgroundColor:this.props.color,    
            inFocus:this.props.inFocus,                    
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
                <image //shield image
                    x={(buttonStyles.X*2/3)}
                    y={buttonStyles.Y-82}    
                    width="30" height="30" 
                    href={shieldLogo} visibility={styles.inFocus ? buttonStyles.visibilityB : "hidden"}
                    onClick={()=>this.handleMode("shield",this.state.id)}/>
                <circle //covering of shield
                        cx={(buttonStyles.X*2/3+15)}
                        cy={buttonStyles.Y-41-28}
                        r = {styles.planetRadius+2} 
                        fill = "transparent" 
                        stroke="#acb4b6"     
                        visibility={styles.inFocus ? buttonStyles.visibilityB : "hidden"}
                        onClick={()=>this.handleMode("shield",this.state.id)}
                    ></circle>
                    
                    
                    <text x={(buttonStyles.X/3)-35} y={buttonStyles.Y-60}   //dollar symbol
                        textAnchor="middle" 
                        visibility={styles.inFocus ? buttonStyles.visibilityA : "hidden"}
                        onClick={()=>this.handleMode("hasten",this.state.id)}
                        fontSize="24px"
                        >$
                    </text>                                                                                                 
                    <circle //covering of dollar
                        cx={(buttonStyles.X/3)-35} cy={buttonStyles.Y-68}
                        r = {styles.planetRadius+2} 
                        fill = "transparent" 
                        stroke="#acb4b6"     
                        visibility={styles.inFocus ? buttonStyles.visibilityA : "hidden"}                   
                        onClick={()=>this.handleMode("hasten",this.state.id)}
                    ></circle>

                    <circle //border of planets 
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius+2} 
                        fill = "#525576" 
                        stroke="#acb4b6"  
                        strokeDasharray="5,5"
                        visibility= {styles.inFocus ? "visible" : "hidden"}
                        onClick={this.handleClick}
                        ></circle>
                    
                    <circle //the planet
                        cx = {styles.Cx} 
                        cy = {styles.Cy} 
                        r = {styles.planetRadius} 
                        fill = {styles.backgroundColor} 
                        onClick={this.handleClick}
                        
                    ></circle>    

                    <circle //hasten animation
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
                    <circle //shield animation
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
                    <text cursor="pointer" x={styles.textX} y={styles.textY} textAnchor="middle" fontSize="12px" onClick={this.handleClick}>                                                
                        {                    
                            this.props.active ? this.state.power : 3
                        }                    
                    </text>
                </g>  
        )
        
    }
}
export default Planet