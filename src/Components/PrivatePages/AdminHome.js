import React, { Component } from 'react'
import  {NavLink} from 'react-router-dom'


class AdminHome extends Component {
    
    constructor() {
        super()
        this.state = {
          leads: null,
          clients: null,
          cases: null
        }
    }
    
    getLeads = () => {
        fetch('http://localhost:3000/users?type=leads').then(
            resp => resp.json()
        ).then(
            data => this.setState({leads: data})
        )
    }

    displayLeads = () => {
        return (
            <div> 
                {this.state.leads.map(lead => {
                    return (
                        <NavLink to={`/leads/${lead.id}`} exact>
                            {lead.first_name} {lead.last_name}
                        </NavLink> 
                    )
                })}
            </div>
        )
    }
    
    getClients = () => {
        fetch('http://localhost:3000/users?type=clients').then(
            resp => resp.json()
        ).then( 
            data => this.setState({clients: data})
        )
    }

    displayClients = () => {
        return (
            <div> 
                {this.state.clients.map(client => {
                    return (
                        <div>{client.first_name} {client.last_name}</div>
                    )
                })}
            </div>
        )
    }

    getCases = () => {
        fetch('http://localhost:3000/cases').then(
            resp => resp.json()
        ).then( 
            data => this.setState({cases: data})
        )
    }

    displayCases = () => {
        return (
            <div> 
                {this.state.cases.map(client => {
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
                <div onClick={this.getLeads}>Get Leads</div>
                <div onClick={this.getClients}>Get Clients</div>
                <div onClick={this.getCases}>Get Cases</div>
                <br/><br/>  
                {this.state.leads ? this.displayLeads() : null}
                <br/><br/>  
                {this.state.clients ? this.displayClients() : null}
                <br/><br/>  
                {this.state.cases ? this.displayCases() : null}
            </div>
        )
    }
}

export default AdminHome

 