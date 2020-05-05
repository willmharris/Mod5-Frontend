import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewLead extends Component {
    
    constructor() {
        super()
        this.state = {
          firstName: null,
          lastName: null,
          email: null,
          phoneNumber: null,
          zipCode: null,
          callScheduled: false,
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
        } else if (id === "phoneNumber") {
            this.setState({phoneNumber: input})
        } else if (id === "zipCode") {
            this.setState({zipCode: input})
        }
    }

    createNewLead = (event) => {
        event.preventDefault()
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            lead_active: true,
            email: this.state.email,
            account_type: 1,
            phone_number: this.state.phoneNumber,
            zip_code: this.state.zipCode,
            call_scheduled: this.state.callScheduled,
            password: "1234"
        }
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

    callScheduled = () => {
        this.setState({callScheduled: true})
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
                    <br />
                    <label>Call scheduled?</label>
                    <input type="checkbox" onChange={this.callScheduled}></input>
                    <br />
                    <label>Email:</label>
                    <input type="text" id="email" onChange={this.updateFormState}></input>
                    <br />
                    <label>Phone Number:</label>
                    <input type="number" id="phoneNumber" onChange={this.updateFormState}></input>
                    <br />
                    <label>Zip Code:</label>
                    <input type="number" id="zipCode" onChange={this.updateFormState}></input>
                    <br />
                    <input type="submit" onClick={this.createNewLead}></input>
                </form>
            </div>
        )
    }
}

export default NewLead
