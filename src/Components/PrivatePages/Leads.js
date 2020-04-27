import React from 'react'

function Leads() {


    return(
        <div>
            {`${window.location.pathname.substring(13)}`}
        </div>
    )
}

export default Leads