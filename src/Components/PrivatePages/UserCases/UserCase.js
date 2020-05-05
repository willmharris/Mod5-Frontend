import React, { Component } from 'react'
import {  NavLink} from 'react-router-dom'

class Session extends Component {
    
    constructor() {
        super()
        this.state = {
            currentUserCase: null,
            currentClient: null, 
            plannedSessionConfirmed: null,
            teamRelationship: null,
            edit: false
        }
    }

    updateFormState = (event) => {
        let input = event.target.value
        this.setState({teamRelationship: input})
    }

    changeEditMode = (event) => {
        if (event) { event.preventDefault() }
        let newEditState = !this.state.edit
        this.setState({edit: newEditState})
    }

    editUserCase = (event) => {
        event.preventDefault()
        let data = {
            planned_session_confirmed: this.state.plannedSessionConfirmed,
            team_relationship: this.state.teamRelationship
        }
        fetch(`http://localhost:3000/user_cases/${this.state.currentUserCase.id}`, {
            method: "PATCH", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.updateUserCase(data)
        ).then(
            this.changeEditMode()
        )
    }

    activate = () => {
        this.setState({plannedSessionConfirmed: true})
    }

    deactivate = () => {
        this.setState({plannedSessionConfirmed: false})
    }

    updateUserCase = (userCase) => {
        this.setState({currentUserCase: userCase})
    }

   
    render() {
        
        return(
            <div>
                {this.state.edit ? 
                    <div>
                        <form>
                            {this.state.plannedSessionConfirmed ? 
                                <label>Not confirmed:</label>
                                :
                                <label>Confirmed:</label>
                            }
                            {this.state.plannedSessionConfirmed ? 
                                <input type="checkbox" onChange={this.deactivate}></input>
                                :
                                <input type="checkbox" onChange={this.activate}></input>
                            }
                            <label>Relationship:</label>
                            <input type="text" value={this.state.teamRelationship} onChange={this.updateFormState}></input>
                            <input type="submit" onClick={this.editUserCase}></input>
                        </form>
                    </div>
                    :
                    <div> 
                        {this.state.currentUserCase ?
                            <div>
                                <NavLink to={`/admin/clients/#${this.state.currentClient.id}`}><p>{this.state.currentClient.first_name} {this.state.currentClient.last_name}</p></NavLink>
                                <p>Next Session Confirmed: {this.state.plannedSessionConfirmed ? "Yes" : "No"}</p>
                                <p>Relationship: {this.state.teamRelationship}</p>
                            </div>
                            :
                            null
                        }
                    </div>
                }
                {this.state.edit ? 
                    <button onClick={this.changeEditMode}>Display</button> 
                    : 
                    <button onClick={this.changeEditMode}>Edit</button>
                }
            </div>
        )
    }

    componentDidMount() {
        let userCase = this.props.userCase
        let client = this.props.clients.filter(client => client.id === userCase.user_id)[0]
        this.setState({
            currentUserCase: userCase, 
            currentClient: client,
            plannedSessionConfirmed: userCase.planned_session_confirmed,
            teamRelationship: userCase.team_relationship
        })
    }

}

export default Session
