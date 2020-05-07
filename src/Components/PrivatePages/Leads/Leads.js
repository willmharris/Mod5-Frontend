import React, { Component } from 'react'
import { Redirect } from 'react-router'
import LeadDisplay from './LeadDisplay.js'
import LeadEdit from './LeadEdit.js'
 

class Leads extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            currentLead: null,
            edit: false,
            redirect: false
        }
    }

    getLead = () => {
        let lead = this.props.leads.filter(lead => lead.id === this.state.id)[0]
        this.setState({currentLead: lead})
    }

    updateLead = (updatedLead) => {
        this.setState({currentLead: updatedLead})
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

    switchEditMode = (event) => {
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
                    <LeadEdit currentLead={this.state.currentLead} switchEditMode={this.switchEditMode} updateLead={this.updateLead} /> 
                    : 
                    <LeadDisplay currentLead={this.state.currentLead}/>
                }
                <br />
                {this.state.edit ? 
                    <button secondary onClick={this.switchEditMode}>Display</button> 
                    : 
                    <button secondary onClick={this.switchEditMode}>Edit</button>
                }
                <button secondary onClick={this.upgradeToClient}>Upgrade to client</button>
                <button secondary onClick={this.deleteLead}>Delete lead</button>
            </div>
        )
    }

    componentDidMount() {
        this.getLead()
    }
}

export default Leads
