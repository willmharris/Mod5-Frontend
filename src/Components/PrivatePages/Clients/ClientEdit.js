import React, { Component } from 'react'
import { Redirect } from 'react-router';

class ClientEdit extends Component {
    
    constructor() {
        super()
        this.state = {
          firstName: null,
          lastName: null,
          email: null,
          phoneNumber: null,
          zipCode: null,
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

    editClient = (event) => {
        event.preventDefault()
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            phone_number: this.state.phoneNumber,
            zip_code: this.state.zipCode 
        }
        fetch(`http://localhost:3000/users/${this.props.currentClient.id}`, {
            method: "PATCH", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.updateClient(data)
        ).then(
            this.props.changeEditMode()
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
                    <input type="text" id="firstName" value={this.state.firstName} onChange={this.updateFormState}></input>
                    <label>Last Name:</label>
                    <input type="text" id="lastName" value={this.state.lastName} onChange={this.updateFormState}></input>
                    <br />
                    <label>Email:</label>
                    <input type="text" id="email" value={this.state.email} onChange={this.updateFormState}></input>
                    <br />
                    <label>Phone Number:</label>
                    <input type="number" id="phoneNumber" value={this.state.phoneNumber} onChange={this.updateFormState}></input>
                    <br />
                    <label>Zip Code:</label>
                    <input type="number" id="zipCode" value={this.state.zipCode} onChange={this.updateFormState}></input>
                    <br />
                    <input type="submit" onClick={this.editClient}></input>
                </form>
            </div>
        )
    }

    componentDidMount() {
        let client = this.props.currentClient
        this.setState({
            firstName: client.first_name, 
            lastName: client.last_name, 
            email: client.email,
            phoneNumber: client.phone_number,
            zipCode: client.zip_code 
        })
    }
}

export default ClientEdit
