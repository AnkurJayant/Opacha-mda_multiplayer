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
            inFocus:true     
        }
        this.powerInc=this.powerInc.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    
    componentDidMount(){        
        this.setState({            
            x:this.props.x,
            y:this.props.y,
            id:this.props.id            
        })                 
        this.state.mode==="normal"? this.interval=setInterval(()=>this.powerInc(),1000) :this.interval=setInterval(()=>this.powerInc(),500) 
    }    
    powerInc(){
        this.setState(prevState=>({power:prevState.power+1}))
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    handleClick=()=>{
        this.setState(prevState=>({inFocus:!prevState.inFocus}))
        console.log(this.state.inFocus)
    }

    render(){

        let styles={
            backgroundColor:this.props.color,
            radius:15,            
            textX:(this.state.x*5-0.5),
            textY:(this.state.y*5+4.5),
            Cx:this.state.x*5,
            Cy:this.state.y*5,
            palnetRadius:this.state.radius
        }
        return(          
                <g>
                    
                    <circle cx = {styles.Cx} cy = {styles.Cy} r = {styles.radius+2} fill = "#525576" stroke="#acb4b6"  strokeDasharray="5,5"></circle>
                    <circle cx = {styles.Cx} cy = {styles.Cy} r = {styles.radius} fill = {styles.backgroundColor} onClick={this.handleClick}></circle>    
                            
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