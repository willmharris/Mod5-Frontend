import React from 'react'
 

function LeadDisplay(props) {
    return(
        <div >
            {props.currentLead ? 
                <div>
                    {props.currentLead.first_name} {props.currentLead.last_name}
                    <br /> <br /> 
                    Status: {props.currentLead.lead_active ? "Active" : "Inactive"}
                    <br /> <br /> 
                    Email: {props.currentLead.email}
                    <br /> <br /> 
                    Phone number: {props.currentLead.phone_number}
                    <br /> <br /> 
                    Zip code: {props.currentLead.zip_code}
                    <br /> <br /> 
                    Call scheduled? {props.currentLead.call_scheduled? "Yes" : "No"}
                    <br /> <br /> 
                    First Contact Date: {props.currentLead.first_contact_date ? props.currentLead.first_contact_date.substring(0, 10) : "None"}
                    <br /> <br /> 
                    Second Contact Date: {props.currentLead.second_contact_date ? props.currentLead.second_contact_date.substring(0, 10) : "None"}
                    <br /> <br /> 
                    Third Contact Date: {props.currentLead.third_contact_date ? props.currentLead.third_contact_date.substring(0, 10) : "None"}
                  
                   
                </div>
                :
                null
            }
        </div>
    )
}

export default LeadDisplay