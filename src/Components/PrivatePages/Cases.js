import React from 'react'

function Cases(props) {
    
    let id = parseInt(window.location.hash.substring(1))
    let specificCase = props.cases.filter(specificCase => specificCase.id === id)[0]
    
    return(
        <div>
            {specificCase.active ? "active" : "inactive"}
            <br />
            {specificCase.confirmed_date}
            <br />
            {specificCase.confirmed_location}
        </div>
    )
}

export default Cases