import React from 'react'

class Planet extends React.Component{
    constructor(){
        super()
        this.state={
            x:0,
            y:0,    
            power:3,       
            id:0,
            active:false,
            color:""     
        }
    }
    
    componentDidMount(){        
        this.setState({            
            x:this.props.x,
            y:this.props.y,
            id:this.props.id            
        })                                
        setTimeout(()=>this.setState(prevState=>({power:prevState.power+1})),1000)
    }    

    render(){

        let styles={
            backgroundColor:this.props.color,
            radius:15,            
        }

        return(          
                <g>
                    
                    <circle cx = {this.state.x*5} cy = {this.state.y*5} r = {styles.radius+2} fill = "#525576" stroke="#acb4b6"  strokeDasharray="5,5"></circle>
                    <circle cx = {this.state.x*5} cy = {this.state.y*5} r = {styles.radius} fill = {styles.backgroundColor} ></circle>    
                            
                    <text x={this.state.x*5} y={this.state.y*5} textAnchor="middle">
                        {                    
                            this.props.active? this.state.power : 3
                        }                    
                    </text>
                </g>  
        )
    
    }
}
export default Planet