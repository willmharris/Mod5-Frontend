import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AdminHome from "./AdminHome.js"
import Leads from "./Leads.js"
import Clients from "./Clients.js"
import CasePipelines from "./CasePipelines.js"
import CaseSessions from "./CaseSessions.js"


class AdminContainer extends Component {
    render() {
        return(
            <div>
                <Route exact path="/admin" render={<AdminHome />} />
                <Route exact path="/admin/leads" render={<Leads />} />
                <Route exact path="/admin/clients" render={<Clients />} />
                <Route exact path="/admin/case-pipelines" render={<CasePipelines />} />
                <Route exact path="/admin/case-sessions" render={<CaseSessions />} />
            </div>
        )
    }
}

export default AdminContainer