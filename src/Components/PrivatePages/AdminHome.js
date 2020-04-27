import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'


class AdminHome extends Component {
    
    displayLeads = () => {
        return (
            <div> 
                {this.props.leads.map(lead => {
                    return (
                        <NavLink to={`/admin/leads/${lead.id}`} exact>
                            {lead.first_name} {lead.last_name}
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
                        <div>{client.first_name} {client.last_name}</div>
                    )
                })}
            </div>
        )
    }

    displayCases = () => {
        return (
            <div> 
                {this.props.cases.map(client => {
                    return (
                    <div>Id: {client.id} Created: {client.created_at}</div> 
                    )
                })}
            </div>
        )
    }

    render() {
        return(
            <div>
                <div onClick={this.props.getLeads}>Get Leads</div>
                <div onClick={this.props.getClients}>Get Clients</div>
                <div onClick={this.props.getCases}>Get Cases</div>
                <br/><br/>  
                {this.props.leads ? this.displayLeads() : null}
                <br/><br/>  
                {this.props.clients ? this.displayClients() : null}
                <br/><br/>  
                {this.props.cases ? this.displayCases() : null}
            </div>
        )
    }
}

export default AdminHome

 