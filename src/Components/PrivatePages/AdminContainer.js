import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import AdminHome from "./AdminHome.js"
import Leads from "./Leads.js"
import Clients from "./Clients.js"
import CasePipelines from "./CasePipelines.js"
import CaseSessions from "./CaseSessions.js"


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

    render() {
        return(
            <div>
                <div>
                    <NavLink to="/admin" exact>Admin Container </NavLink>
                    <NavLink to="/admin/leads" exact>Leads </NavLink>
                    <NavLink to="/admin/clients" exact>Clients </NavLink>
                    <NavLink to="/admin/case-pipelines" exact>Case Pipeline </NavLink>
                    <NavLink to="/admin/case-sessions" exact>Case Sessions </NavLink>
                </div> 
                <div>
                    <Route exact path="/admin" render={() => <AdminHome getLeads={this.getLeads} getClients={this.getClients} getCases={this.getCases} leads={this.state.leads} clients={this.state.clients} cases={this.state.cases}/>} />
                    <Route path="/admin/leads" render={() => <Leads leadsInfo={this.state.leads} />} />
                    <Route path="/admin/clients" render={() => <Clients />} />
                    <Route path="/admin/case-pipelines" render={() => <CasePipelines />} />
                    <Route path="/admin/case-sessions" render={() => <CaseSessions />} />
                </div>
            </div>
        )
    }
}

export default AdminContainer