import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewLead extends Component {
    
    constructor() {
        super()
        this.state = {
          firstName: null,
          lastName: null,
          email: null,
          redirect: false
        }
    }

    updateFormState = (event) => {
        let id = event.target.id
        let input = event.target.value
        if (id === "firstName") {
            this.setState({firstName: input})
        } else if (id === "lastName") {
            this.setState({lastName: input})
        } else if (id === "email") {
            this.setState({email: input})
        }
    }

    createNewLead = (event) => {
        event.preventDefault()
        let data = this.state
        fetch('http://localhost:3000/users', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.addLead(data)
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
                <form>
                    <label>First Name:</label>
                    <input type="text" id="firstName" onChange={this.updateFormState}></input>
                    <label>Last Name:</label>
                    <input type="text" id="lastName" onChange={this.updateFormState}></input>
                    <label>Email:</label>
                    <input type="text" id="email" onChange={this.updateFormState}></input>
                    <input type="submit" onClick={this.createNewLead}></input>
                </form>
            </div>
        )
    }
}

export default NewLead
