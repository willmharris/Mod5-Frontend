import React, { Component } from 'react'
import { Redirect } from 'react-router';

class GetInTouch extends Component {
    
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
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            account_type: 1,
            password: "1234"
        }
        fetch('http://localhost:3000/users', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(
            this.setState({redirect: true})
        )
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/schedule-a-call' />
        }
        
        return(
            <div>
                Get in touch!
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

export default GetInTouch
