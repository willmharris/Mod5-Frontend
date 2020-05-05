import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewCase extends Component {
    
    constructor() {
        super()
        this.state = {
            plannedDate: null,
            plannedLocation: null,
            firstClient: null,
            secondClient: null,
            redirect: false
        }
    }

    updateFormState = (event) => {
        let id = event.target.id
        let input = event.target.value
        if (id === "plannedDate") {
            this.setState({plannedDate: input})
        } else if (id === "plannedLocation") {
            this.setState({plannedLocation: input})
        }
    }

    createNewCase = (event) => {
        event.preventDefault()
        let data = {
            planned_date: this.state.plannedDate,
            planned_location: this.state.plannedLocation,
            first_client: this.state.firstClient,
            second_client: this.state.secondClient
        }
        fetch('http://localhost:3000/cases', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.addCase(data)
        ).then(
            this.setState({redirect: true})
        )
    }

    addToCase(client) {
        console.log('working')
        if (!this.state.firstClient) {
            this.setState({firstClient: client})
        } else if (!this.state.secondClient) {
            this.setState({secondClient: client})
        }
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                <form>
                    <label>Planned Date:</label>
                    <input type="date" id="plannedDate" onChange={this.updateFormState}></input>
                    <br />
                    <label>Planned Location:</label>
                    <input type="text" id="plannedLocation" onChange={this.updateFormState}></input>
                    <br /> 
                    <input type="submit" onClick={this.createNewCase}></input>
                </form>
                <div>
                    <p>Participants:</p>
                    <p>
                        {this.state.firstClient ? this.state.firstClient.first_name : null}
                        {this.state.firstClient ? this.state.firstClient.last_name : null}
                    </p>
                    <p>
                        {this.state.secondClient ? this.state.secondClient.first_name : null} 
                        {this.state.secondClient ? this.state.secondClient.last_name : null}
                    </p>
                </div>
                <div>
                    Clients:
                    {this.props.clients.map(client => <div onClick={() => this.addToCase(client)}>{client.first_name} {client.last_name}</div>)}
                </div>
            </div>
        )
    }
}

export default NewCase
