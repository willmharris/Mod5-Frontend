import React, { Component } from 'react'
import CaseDisplay from '../PrivatePages/Cases/CaseDisplay.js'
import SessionsContainer from '../PrivatePages/Sessions/SessionsContainer.js'
import UserCasesContainer from '../PrivatePages/UserCases/UserCasesContainer.js'


class YourCase extends Component {
    
    constructor() {
        super()
        this.state = {
            yourUserId: null,
            cases: null,
            clients: null,
            userCases: null,
            sessions: null,
            currentCaseId: null,
            currentCase: null,
            currentUserCases: null,
            currentCaseClients: null,
            admin: false
        }
    }
   
    render() {
        return(
            <div style={{padding: "0px 200px 0px 200px", fontSize: 25}}>
                {this.state.cases ?
                    <CaseDisplay currentCase={this.state.currentCase} currentUserCases={this.state.currentUserCases} currentCaseClients={this.state.currentCaseClients}/>
                    :
                    null
                }
                <br />
                <br />
                <p>Participants:</p>
                {this.state.cases ?
                    <UserCasesContainer admin={this.state.admin} clients={this.state.clients} userCases={this.state.userCases} id={this.state.currentCaseId} />
                    :
                    null
                }
                <br />
                <br />
                <p>Sessions:</p>
                {this.state.cases ?
                    <SessionsContainer admin={this.state.admin} sessions={this.state.sessions} id={this.state.currentCaseId} />
                    :
                    null
                }
            </div>
        )
    }

    componentDidMount() {
        fetch(
            'http://localhost:3000/info'
        ).then(
            resp => resp.json()
        ).then(
            data => {
                let yourUserId = parseInt(this.props.cookies.get('id'))
                let cases = data.cases
                let clients = data.clients
                let userCases = data.user_cases
                let sessions = data.sessions
                let currentCaseId = userCases.filter(userCase => userCase.user_id === yourUserId)[0].case_id
                let currentCase = cases.filter(theCase => theCase.id === currentCaseId)[0]
                let currentUserCases = userCases.filter(userCase => userCase.case_id === currentCaseId)
                let currentCaseClients = currentUserCases.map(userCase => clients.find(client => client.id === userCase.user_id))
                this.setState({
                    yourUserId: yourUserId,
                    cases: cases,
                    clients: clients,
                    userCases: userCases,
                    sessions: sessions,
                    currentCaseId: currentCaseId,
                    currentCase: currentCase,
                    currentUserCases: currentUserCases,
                    currentCaseClients: currentCaseClients
                })
            }
        )
    }
    
}

export default YourCase
 
                   