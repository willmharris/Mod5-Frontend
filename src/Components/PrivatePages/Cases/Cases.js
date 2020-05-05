import React, { Component } from 'react'
import { Redirect } from 'react-router';
import CaseDisplay from './CaseDisplay.js'
import CaseEdit from './CaseEdit.js'
import SessionsContainer from '../Sessions/SessionsContainer.js'

class Cases extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            currentCase: null,
            currentUserCases: null,
            currentCaseClients: null,
            edit: false,
            redirect: false
        }
    }

    getCaseAndClients = () => {
        let theCase = this.props.cases.filter(theCase => theCase.id === this.state.id)[0]
        let userCases = this.props.userCases.filter(userCase => userCase.case_id === theCase.id)
        let clients = userCases.map(userCase => this.props.clients.find(client => client.id === userCase.user_id))
        this.setState({currentCase: theCase, currentUserCases: userCases, currentCaseClients: clients})
    }

    updateCase = (newCase) => {
        this.setState({currentCase: newCase})
    }

    deleteCase = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/cases/${this.state.id}`, {
            method: "DELETE"
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.removeCase(data)

        ).then(
            this.setState({redirect: true})
        )
    }

    changeEditMode = (event) => {
        if (event) { event.preventDefault() }
        let newEditState = !this.state.edit
        this.setState({edit: newEditState})
    }

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.edit ? 
                    <CaseEdit currentCase={this.state.currentCase} changeEditMode={this.changeEditMode} updateCase={this.updateCase} /> 
                    : 
                    <CaseDisplay currentCase={this.state.currentCase} currentUserCases={this.state.currentUserCases} currentCaseClients={this.state.currentCaseClients}/>
                }
                <br />
                {this.state.edit ? 
                    <button onClick={this.changeEditMode}>Display</button> 
                    : 
                    <button onClick={this.changeEditMode}>Edit</button>
                }
                <button onClick={this.deleteCase}>Delete case</button>
                <br />
                <br />
                <p>Sessions:</p>
                <SessionsContainer sessions={this.props.sessions} id={this.state.id} />
                
            </div>
        )
        
    }

    componentDidMount() {
        this.getCaseAndClients()
    }
}

export default Cases
