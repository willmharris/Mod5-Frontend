import React, { Component } from 'react'
import { Redirect } from 'react-router';
 

class LeadEdit extends Component {
    
    constructor() {
        super()
        this.state = {
          firstName: null,
          lastName: null,
          leadActive: null,
          email: null,
          phoneNumber: null,
          zipCode: null,
          callScheduled: null,
          firstContactDate: null,
          firstContactStatus: null,
          secondContactDate: null,
          secondContactStatus: null,
          thirdContactDate: null,
          thirdContactStatus:null,
          redirect: false
        }
    }

    updateFormState = (event) => {
        debugger
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
        } else if (id === "callScheduled") {
            this.setState({callScheduled: input})
        } else if (id === "firstContactDate") {
            this.setState({firstContactDate: input})
        } else if (id === "firstContactStatus") {
            this.setState({firstContactStatus: input})
        } else if (id === "secondContactDate") {
            this.setState({secondContactDate: input})
        } else if (id === "secondContactStatus") {
            this.setState({secondContactStatus: input})
        } else if (id === "thirdContactDate") {
            this.setState({thirdContactDate: input})
        } else if (id === "thirdContactStatus") {
            this.setState({firstContactDate: input})
        }
    }

    editLead = (event) => {
        event.preventDefault()
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            lead_active: this.state.leadActive,
            email: this.state.email,
            phone_number: this.state.phoneNumber,
            zip_code: this.state.zipCode,
            call_scheduled: this.state.callScheduled,
            first_contact_date: this.state.firstContactDate,
            first_contact_status: this.state.firstContactStatus,
            second_contact_date: this.state.secondContactDate,
            second_contact_status: this.state.secondContactStatus,
            third_contact_date: this.state.thirdContactDate,
            third_contact_status: this.state.thirdContactStatus
        }
        fetch(`http://localhost:3000/users/${this.props.currentLead.id}`, {
            method: "PATCH", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.updateLead(data)
        ).then(
            this.props.switchEditMode()
        )
    }

    activate = () => {
        this.setState({leadActive: true})
    }

    deactivate = () => {
        this.setState({leadActive: false})
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
                    <br /> <br /> 
                    <label>Last Name:</label>
                    <input type="text" id="lastName" value={this.state.lastName} onChange={this.updateFormState}></input>
                    <br /> <br />
                    {this.props.currentLead.lead_active ? 
                        <label>Deactivate:</label>
                        :
                        <label>Activate:</label>
                    }
                    {this.props.currentLead.lead_active ? 
                        <input type="checkbox" onChange={this.deactivate}></input>
                        :
                        <input type="checkbox" onChange={this.activate}></input>
                    }
                    <br /> <br />
                    <label>Email:</label>
                    <input type="text" id="email" value={this.state.email} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <label>Phone Number:</label>
                    <input type="number" id="phoneNumber" value={this.state.phoneNumber} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <label>Zip Code:</label>
                    <input type="number" id="zipCode" value={this.state.zipCode} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <label>First Contact Date:</label>
                    <input type="date" id="firstContactDate" value={this.state.firstContactDate} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <label>Second Contact Date:</label>
                    <input type="date" id="secondContactDate" value={this.state.secondContactDate} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <label>Third Contact Date:</label>
                    <input type="date" id="thirdContactDate" value={this.state.thirdContactDate} onChange={this.updateFormState}></input>
                    <br /> <br />
                    <input type="submit" onClick={this.editLead}></input>
                </form>
            </div>
        )
    }

    componentDidMount() {
        let lead = this.props.currentLead
        debugger
        this.setState({
            firstName: lead.first_name, 
            lastName: lead.last_name, 
            leadActive: lead.lead_active,
            email: lead.email,
            phoneNumber: lead.phone_number,
            zipCode: lead.zip_code,
            callScheduled: lead.call_scheduled,
            firstContactDate: lead.first_contact_date,
            firstContactStatus: lead.first_contact_status,
            secondContactDate: lead.second_contact_date,
            secondContactStatus: lead.second_contact_status,
            thirdContactDate: lead.third_contact_date,
            thirdContactStatus: lead.third_contact_status
        })
    }
}

export default LeadEdit
