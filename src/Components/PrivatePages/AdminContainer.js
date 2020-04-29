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
        console.log(this.state)
    }

    addLead = (lead) => {
        let currentLeads = this.state.leads
        let newLeads = [...currentLeads, lead]
        this.setState({leads: newLeads})
    }

    removeLead = (removedLead) => {
        let currentLeads = this.state.leads
        let newLeads = currentLeads.filter(lead => lead.id !== removedLead.id)
        this.setState({leads: newLeads})
    }

    addClient = (client) => {
        let currentClients = this.state.clients
        let newClients = [...currentClients, client]
        this.setState({clients: newClients})
    }

    removeClient = (removedClient) => {
        let currentClients = this.state.clients
        let newClients = currentClients.filter(client => client.id !== removedClient.id)
        this.setState({clients: newClients})
    }

    addCase = (thisCase) => {
        let currentCases = this.state.cases
        let newCases = [...currentCases, thisCase]
        this.setState({cases: newCases})
    }

    removeCase = (removedCase) => {
        let currentCases = this.state.cases
        let newCases = currentCases.filter(thisCase => thisCase.id !== removedCase.id)
        this.setState({cases: newCases})
    }

    render() {
        return(
            <div>
                <Route exact path="/admin" render={() => <AdminHome getServerInfo={this.getServerInfo} leads={this.state.leads} clients={this.state.clients} cases={this.state.cases}/>} />
                <Route exact path="/admin/new-lead" render={() => <NewLead addLead={this.addLead} />} />
                <Route exact path="/admin/new-case" render={() => <NewCase addCase={this.addCase}  />} />
                <Route path="/admin/leads" render={() => <Leads leads={this.state.leads} removeLead={this.removeLead} addClient={this.addClient} />} />
                <Route path="/admin/clients" render={() => <Clients clients={this.state.clients} addLead={this.addLead} removeClient={this.removeClient}  />} />
                <Route path="/admin/cases" render={() => <Cases cases={this.state.cases} removeCase={this.removeCase}  />} />
            </div>
        )
    }
}

export default AdminContainer