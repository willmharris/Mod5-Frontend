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
            edit: false,
            redirect: false
        }
    }

    getClient = () => {
        let client = this.props.clients.filter(client => client.id === this.state.id)[0]
        this.setState({currentClient: client})
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
            this.setState({redirect: true})
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
            <div>
                {this.state.edit ? 
                    <ClientEdit currentClient={this.state.currentClient} changeEditMode={this.changeEditMode} updateClient={this.updateClient} /> 
                    : 
                    <ClientDisplay currentClient={this.state.currentClient}/>
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
        this.getClient()
    }
}

export default Clients
