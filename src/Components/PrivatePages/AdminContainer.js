import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AdminHome from "./AdminHome.js"
import NewLead from "./Leads/NewLead.js"
import NewCase from "./Cases/NewCase.js"
import Leads from "./Leads/Leads.js"
import Clients from "./Clients/Clients.js"
import Cases from "./Cases/Cases.js"


class AdminContainer extends Component {
    
    constructor() {
        super()
        this.state = {
          leads: null,
          clients: null,
          cases: null,
          sessions: null,
          userCases: null
        }
    }

    getServerInfo = () => {
        fetch('http://localhost:3000/info').then(
            resp => resp.json()
        ).then(
            data => {
                this.setState({
                    leads: data.leads, 
                    clients: data.clients, 
                    cases: data.cases, 
                    sessions: data.sessions,
                    userCases: data.user_cases
                })
            }
        )
    }

    addLead = (addedLead) => {
        let newLeads = [...this.state.leads, addedLead]
        this.setState({leads: newLeads})
    }

    removeLead = (removedLead) => {
        let newLeads = this.state.leads.filter(lead => lead.id !== removedLead.id)
        this.setState({leads: newLeads})
    }

    addClient = (addedClient) => {
        let newClients = [...this.state.clients, addedClient]
        this.setState({clients: newClients})
    }

    removeClient = (removedClient) => {
        let newClients = this.state.clients.filter(client => client.id !== removedClient.id)
        this.setState({clients: newClients})
    }

    addCase = (data) => {
        let newCases = [...this.state.cases, data["addedCase"]]
        let newUserCases = [...this.state.userCases, data["firstAddedUserCase"], data["secondAddedUserCase"]]   
        this.setState({cases: newCases, userCases: newUserCases})
    }

    removeCase = (removedCase) => {
        let newCases = this.state.cases.filter(thisCase => thisCase.id !== removedCase.id)
        let newUserCases = this.state.userCases.filter(userCase => userCase.case_id !== removedCase.id)
        this.setState({cases: newCases, userCases: newUserCases})
    }

    render() {
        return(
            <div>
                <Route exact path="/admin" render={() => 
                    <AdminHome 
                        getServerInfo={this.getServerInfo} 
                        leads={this.state.leads} 
                        clients={this.state.clients} 
                        cases={this.state.cases}
                    />
                } />
                <Route exact path="/admin/new-lead" render={() => 
                    <NewLead addLead={this.addLead} />
                } />
                <Route exact path="/admin/new-case" render={() => 
                    <NewCase addCase={this.addCase} clients={this.state.clients} />
                } />
                <Route path="/admin/leads" render={() => 
                    <Leads 
                        leads={this.state.leads} 
                        removeLead={this.removeLead} 
                        addClient={this.addClient} 
                    />
                } />
                <Route path="/admin/clients" render={() => 
                    <Clients 
                        clients={this.state.clients} 
                        cases={this.state.cases} 
                        userCases={this.state.userCases} 
                        addLead={this.addLead} 
                        removeClient={this.removeClient} 
                    />
                } />
                <Route path="/admin/cases" render={() => 
                    <Cases 
                        cases={this.state.cases} 
                        clients={this.state.clients} 
                        userCases={this.state.userCases} 
                        sessions = {this.state.sessions} 
                        removeCase={this.removeCase}  
                    />
                } />
            </div>
        )
    }
}

export default AdminContainer