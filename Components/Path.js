import React from  'react'
function Path(props){
    return(            
            <line x1 = {props.x1*5} y1 = {props.y1*5} x2 = {props.x2*5} y2 = {props.y2*5} 
               style = {{stroke:"#acb4b6",strokeDasharray:"5",strokeWidth:1}}/>           
    )
}

export default Path