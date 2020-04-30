import React from 'react'

function CaseDisplay(props) {
    
    return(
        <div>
            {props.currentCase ? props.currentCase.confirmed_location : null} 
        </div>
    )
}

export default CaseDisplay