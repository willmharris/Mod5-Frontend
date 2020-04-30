import React, { Component } from 'react'
import Session from './Session.js'

class SessionsContainer extends Component {
    
    constructor() {
        super()
        this.state = {
            caseSessions: null
        }
    }

    removeSession = (removedSession) => {
        let newSessions = this.state.caseSessions.filter(session => session.id !== removedSession.id)
        this.setState({caseSessions: newSessions})
    }

    render() {
        return(
            <div>
                {this.state.caseSessions ? 
                    this.state.caseSessions.map(theSession => <Session session={theSession} /> ) 
                    : 
                    null
                }
            </div>
        )
    }

    componentDidMount() {
        let sessions = this.props.sessions.filter(session => session.case_id === this.props.id)
        this.setState({caseSessions: sessions})
    }
}

export default SessionsContainer