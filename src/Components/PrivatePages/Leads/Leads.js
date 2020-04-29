import React, { Component } from 'react'
import { Redirect } from 'react-router'
import LeadDisplay from './LeadDisplay.js'
import LeadEdit from './LeadEdit.js'

class Leads extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            lead: null,
            edit: false,
            redirect: false
        }
    }

    getLead = () => {
        let leadVariable = this.props.leads.filter(lead => lead.id === this.state.id)[0]
        this.setState({lead: leadVariable})
    }

    updateLead = (newLead) => {
        this.setState({lead: newLead})
    }

    upgradeToClient = (event) => {
        event.preventDefault()
        let data = {account_type: 2}
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => {
                this.props.removeLead(data)
                this.props.addClient(data)
            }
        ).then(
            this.setState({redirect: true})
        )
    }

    deleteLead = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "DELETE"
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.removeLead(data)

        ).then(
            this.setState({redirect: true})
        )
    }

    changeMode = (event) => {
        if (event) {
            event.preventDefault()
        }
        let newEditState = !this.state.edit
        this.setState({edit: newEditState})
    }

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.edit ? <LeadEdit lead={this.state.lead} changeMode={this.changeMode} updateLead={this.updateLead} /> : <LeadDisplay lead={this.state.lead}/>}
                <br />
                {this.state.edit ? <button onClick={this.changeMode}>Display</button> : <button onClick={this.changeMode}>Edit</button>}
                <button onClick={this.upgradeToClient}>Upgrade to client</button>
                <button onClick={this.deleteLead}>Delete lead</button>
            </div>
        )
        
    }

    componentDidMount() {
        this.getLead()
    }
}

export default Leads
