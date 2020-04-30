import React, { Component } from 'react'

class Session extends Component {
    
    constructor() {
        super()
        this.state = {
            currentSession: null,
            location: null,
            edit: false
        }
    }

    updateFormState = (event) => {
        let input = event.target.value
        this.setState({location: input})
    }

    changeEditMode = (event) => {
        if (event) { event.preventDefault() }
        let newEditState = !this.state.edit
        this.setState({edit: newEditState})
    }

    editSession = (event) => {
        event.preventDefault()
        let data = {
            location: this.state.location
        }
        fetch(`http://localhost:3000/sessions/${this.props.session.id}`, {
            method: "PATCH", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.updateSession(data)
        ).then(
            this.changeEditMode()
        )
    }

    updateSession = (newSession) => {
        this.setState({currentSession: newSession})
    }

    deleteSession = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/sessions/${this.state.currentSession.id}`, {
            method: "DELETE"
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.removeSession(data)

        ).then(
            this.setState({redirect: true})
        )
    }
    
    render() {
        
        return(
            <div>
                {this.state.edit ? 
                    <form>
                        <label>Location:</label>
                        <input type="text" value={this.state.location} onChange={this.updateFormState}></input>
                        <input type="submit" onClick={this.editSession}></input>
                    </form>
                    :
                    <div> 
                        <p>Location:</p>
                        <p>{this.state.location}</p>
                    </div>
                }
                {this.state.edit ? 
                    <button onClick={this.changeEditMode}>Display</button> 
                    : 
                    <button onClick={this.changeEditMode}>Edit</button>
                }
                <button onClick={this.deleteSession}>Delete session</button>
            </div>
        )
    }

    componentDidMount() {
        let session = this.props.session
        this.setState({currentSession: session, location: session.location})
    }
}

export default Session
