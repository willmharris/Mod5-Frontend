import React from 'react'

function Clients(props) {
    
    let id = parseInt(window.location.hash.substring(1))
    let client = props.clientsInfo.filter(client => client.id === id)[0]
    
    return(
        <div>
             {`${client.first_name}`} {`${client.last_name}`}
            <br />
            {`${client.email}`}
        </div>
    )
}

export default Clients