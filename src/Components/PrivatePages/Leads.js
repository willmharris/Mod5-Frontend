import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Leads extends Component {

    constructor() {
        super()
        this.state = {
            lead: null,
            redirect: false
        }
    }

    deliverLead = () => {
        let id = parseInt(window.location.hash.substring(1))
        let leadVariable = this.props.leadsInfo.filter(lead => lead.id === id)[0]
        this.setState({lead: leadVariable})
    }

    deleteLead = (event) => {
        event.preventDefault()
        let id = parseInt(window.location.hash.substring(1))
        fetch(`http://localhost:3000/users/${id}`, {
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
                <button onClick={this.deliverLead}>Get lead</button>
                <br />
                {this.state.lead ? this.state.lead.first_name : null} {this.state.lead ? this.state.lead.last_name : null}
                <br />
                {this.state.lead ? this.state.lead.email : null}
                <br />
                <button onClick={this.deleteLead}>Delete lead</button>
            </div>
        )
    }
}

export default Leads
