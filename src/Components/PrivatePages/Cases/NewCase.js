import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewCase extends Component {
    
    constructor() {
        super()
        this.state = {
          confirmedLocation: null,
          firstClient: null,
          secondClient: null,
          redirect: false
        }
    }

    updateFormState = (event) => {
        let input = event.target.value
        this.setState({confirmedLocation: input})
    }

    createNewCase = (event) => {
        event.preventDefault()
        let data = {
            confirmed_location: this.state.confirmedLocation,
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
                    <label>Confirmed Location:</label>
                    <input type="text" onChange={this.updateFormState}></input>
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
