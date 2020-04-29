import React from 'react'

function ClientDisplay(props) {
    return(
        <div>
            {props.client ? props.client.first_name : null} {props.client ? props.client.last_name : null}
            <br />
            {props.client ? props.client.email : null}
        </div>
    )
}

export default ClientDisplay