import React from 'react'

function ClientDisplay(props) {
    return(
        <div>
            {props.currentClient ? props.currentClient.first_name : null} {props.currentClient ? props.currentClient.last_name : null}
            <br />
            {props.currentClient ? props.currentClient.email : null}
        </div>
    )
}

export default ClientDisplay