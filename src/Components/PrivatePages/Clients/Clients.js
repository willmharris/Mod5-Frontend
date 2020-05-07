import React, { Component } from 'react'
import { Redirect } from 'react-router'
import ClientDisplay from './ClientDisplay.js'
import ClientEdit from './ClientEdit.js'

class Clients extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            currentClient: null,
            currentClientCases: null,
            edit: false,
            redirect: false
        }
    }

    getClientandCases = () => {
        let client = this.props.clients.filter(client => client.id === this.state.id)[0]
        let userCases = this.props.userCases.filter(userCase => userCase.user_id === client.id)
        let cases = userCases.map(userCase => this.props.cases.find(theCase => theCase.id === userCase.case_id))
        this.setState({currentClient: client, currentClientCases: cases})
    }

    updateClient = (newClient) => {
        this.setState({currentClient: newClient})
    }

    downgradeToLead = (event) => {
        event.preventDefault()
        let data = {account_type: 1}
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => {
                this.props.addLead(data)
                this.props.removeClient(data)
            }
        ).then(
            () => this.setState({redirect: true})
        )
    }

    deleteClient = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "DELETE"
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.removeClient(data)
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
            <div style={{padding: "0px 200px 0px 200px", fontSize: 25}}>
                {this.state.edit ? 
                    <ClientEdit currentClient={this.state.currentClient} changeEditMode={this.changeEditMode} updateClient={this.updateClient} /> 
                    : 
                    <ClientDisplay currentClient={this.state.currentClient} currentClientCases={this.state.currentClientCases}/>
                }
                <br /> 
                {this.state.edit ? 
                    <button onClick={this.changeEditMode}>Display</button> 
                    : 
                    <button onClick={this.changeEditMode}>Edit</button>
                }
                <button onClick={this.downgradeToLead}>Downgrad to lead</button>
                <button onClick={this.deleteClient}>Delete client</button>
            </div>
        )
        
    }

    componentDidMount() {
        this.getClientandCases()
    }
}

export default Clients
