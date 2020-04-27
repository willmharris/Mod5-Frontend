import React from 'react'

function Leads(props) {

    let id = parseInt(window.location.pathname.substring(13))
    let lead = props.leadsInfo.filter(lead => lead.id === id)[0]

    return(
        <div>
            {`${lead.first_name}`} {`${lead.last_name}`}
            <br />
            {`${lead.email}`}
        </div>
    )
}

export default Leads
