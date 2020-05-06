import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Session from './Session.js'
import NewSession from './NewSession.js'


class SessionsContainer extends Component {
    
    constructor() {
        super()
        this.state = {
            caseSessions: null
        }
    }

    addSession = (addedSession) => {
        let newSessions = [...this.state.caseSessions, addedSession]
        this.setState({caseSessions: newSessions})
    }

    removeSession = (removedSession) => {
        let newSessions = this.state.caseSessions.filter(session => session.id !== removedSession.id)
        this.setState({caseSessions: newSessions})
    }

    displayAllSessions = () => {
        return( 
            <div>
                {this.props.admin ?
                    <NavLink to={`/admin/cases/${this.props.id}/new-session`}>Add a New Session</NavLink>
                    :
                    null
                }
                {this.state.caseSessions ? 
                    this.state.caseSessions.map(theSession => <Session admin={this.props.admin} session={theSession} removeSession = {this.removeSession} /> ) 
                    : 
                    null
                }
            </div>
        )
    }

    render() {
        return(
            <div>
                <Route exact path={`/admin/cases/${this.props.id}/new-session`} render={() => <NewSession id ={this.props.id} addSession={this.addSession}/>} />
                <Route path={`/`} render={this.displayAllSessions} /> 
            </div>
        )
    }

    componentDidMount() {
        let sessions = this.props.sessions.filter(session => session.case_id === this.props.id)
        this.setState({caseSessions: sessions})
    }
}

export default SessionsContainer

