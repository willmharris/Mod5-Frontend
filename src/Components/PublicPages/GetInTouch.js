import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Form } from 'semantic-ui-react'

class GetInTouch extends Component {
    
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

    createNewLead = (event) => {
        event.preventDefault()
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            phone_number: this.state.phoneNumber,
            zip_code: this.state.zipCode,
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
                <p style={{textAlign: "center", paddingTop: 25, fontSize: 50 }}>Get in touch!</p>
                <Form style={{padding: "0px 500px 0px 500px"}}>
                    <Form.Field>
                        <label style={{fontSize: 20}}>First Name:</label>
                        <input type="text" id="firstName" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Form.Field>
                        <label style={{fontSize: 20}}>Last Name:</label>
                        <input type="text" id="lastName" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Form.Field>
                        <label style={{fontSize: 20}}>Email:</label>
                        <input type="text" id="email" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Form.Field>
                        <label style={{fontSize: 20}}>Phone Number:</label>
                        <input type="number" id="phoneNumber" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Form.Field>
                        <label style={{fontSize: 20}}>Zip Code:</label>
                        <input type="number" id="zipCode" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Button primary type="submit" onClick={this.createNewLead}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default GetInTouch
