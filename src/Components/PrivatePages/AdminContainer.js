import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AdminHome from "./AdminHome.js"
import NewLead from "./NewLead.js"
import NewCase from "./NewCase.js"
import Leads from "./Leads.js"
import Clients from "./Clients.js"
import Cases from "./Cases.js"


class AdminContainer extends Component {
    
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
    
    getClients = () => {
        fetch('http://localhost:3000/users?type=clients').then(
            resp => resp.json()
        ).then( 
            data => this.setState({clients: data})
        )
    }

    getCases = () => {
        fetch('http://localhost:3000/cases').then(
            resp => resp.json()
        ).then( 
            data => this.setState({cases: data})
        )
    }

    getServerInfo = () => {
        this.getLeads()
        this.getClients()
        this.getCases()
    }

    render() {
        return(
            <div>
                <Route exact path="/admin" render={() => <AdminHome getServerInfo={this.getServerInfo} leads={this.state.leads} clients={this.state.clients} cases={this.state.cases}/>} />
                <Route exact path="/admin/new-lead" render={() => <NewLead getServerInfo={this.getServerInfo} />} />
                <Route exact path="/admin/new-case" render={() => <NewCase getServerInfo={this.getServerInfo} />} />
                <Route path="/admin/leads" render={() => <Leads leads={this.state.leads} getServerInfo={this.getServerInfo} />} />
                <Route path="/admin/clients" render={() => <Clients clients={this.state.clients} getServerInfo={this.getServerInfo} />} />
                <Route path="/admin/cases" render={() => <Cases cases={this.state.cases} getServerInfo={this.getServerInfo} />} />
            </div>
        )
    }
}

export default AdminContainer