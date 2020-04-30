import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class AdminHome extends Component {
    
    displayLeads = () => {
        return (
            <div> 
                {this.props.leads.map(lead => {
                    return (
                        <NavLink to={`/admin/leads/#${lead.id}`} exact>
                            {lead.first_name} {lead.last_name}
                            <br />
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    displayClients = () => {
        return (
            <div> 
                {this.props.clients.map(client => {
                    return (
                        <NavLink to={`/admin/clients/#${client.id}`} exact>
                            {client.first_name} {client.last_name}
                            <br />
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    displayCases = () => {
        return (
            <div> 
                {this.props.cases.map(specificCase => {
                    return (
                        <NavLink to={`/admin/cases/#${specificCase.id}`} exact> 
                            {specificCase.id} {specificCase.confirmed_location}
                            <br />
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    render() {
        return(
            <div>
                <NavLink to={`/admin/new-lead`} exact>
                    Add a new lead
                </NavLink>
                <br />
                Leads: {this.props.leads ? this.displayLeads() : null}
                <br/><br/>  
                Clients: {this.props.clients ? this.displayClients() : null}
                <br/><br/>  
                <NavLink to={`/admin/new-case`} exact>
                    Add a new case
                </NavLink>
                <br />
                Cases: {this.props.cases ? this.displayCases() : null}
            </div>
        )
    }

    componentDidMount() {
        this.props.getServerInfo()
    }
}

export default AdminHome

 