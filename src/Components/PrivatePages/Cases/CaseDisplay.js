import React from 'react'


function CaseDisplay(props) {

    return(
        <div>
            {props.currentCase ?
                <div>
                    Status: {props.currentCase.active? "Active" : "Inactive"}
                    <br /> <br />
                    Planned date: {props.currentCase.planned_date ? props.currentCase.planned_date.substring(0, 10) : "None" }
                    <br /> <br />
                    Planned location: {props.currentCase.planned_location ? props.currentCase.planned_location : "None"}
                    <br /> <br />
                    Confirmed date: {props.currentCase.confirmed_date ? props.currentCase.confirmed_date.substring(0, 10) : "None" }
                    <br /> <br />
                    Confirmed location: {props.currentCase.confirmed_location ? props.currentCase.confirmed_location : "None"}
                    <br /> <br />
                </div>
                :
                null
            }
        </div>
    )
}

export default CaseDisplay