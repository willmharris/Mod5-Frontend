import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Clients extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            client: null,
            redirect: false
        }
    }

    getClient = () => {
        let clientVariable = this.props.clients.filter(client => client.id === this.state.id)[0]
        this.setState({client: clientVariable})
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

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.client ? this.state.client.first_name : null} {this.state.client? this.state.client.last_name : null}
                <br />
                {this.state.client ? this.state.client.email : null}
                <br />
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
