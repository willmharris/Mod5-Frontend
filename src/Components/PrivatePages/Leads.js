import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Leads extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            lead: null,
            redirect: false
        }
    }

    getLead = () => {
        let leadVariable = this.props.leadsInfo.filter(lead => lead.id === this.state.id)[0]
        this.setState({lead: leadVariable})
    }

    upgradeToClient = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.state.id}?account_type=2`, {
            method: "PATCH"
        })
    }

    deleteLead = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "DELETE"
        }).then(
            this.setState({redirect: true})
        )
    }

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.lead ? this.state.lead.first_name : null} {this.state.lead ? this.state.lead.last_name : null}
                <br />
                {this.state.lead ? this.state.lead.email : null}
                <br />
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
