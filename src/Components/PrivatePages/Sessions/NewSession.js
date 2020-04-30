import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewSession extends Component {
    
    constructor() {
        super()
        this.state = {
          location: null,
          caseId: null,
          redirect: false
        }
    }

    updateFormState = (event) => {
        let input = event.target.value
        this.setState({location: input})
       
    }

    createNewSession = (event) => {
        event.preventDefault()
        let data = {
            location: this.state.location,
            case_id: this.state.caseId
        }
        fetch('http://localhost:3000/sessions', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.addSession(data)
        ).then(
            this.setState({redirect: true})
        )
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to={`/admin/cases/#${this.state.caseId}`} />
        }
        
        return(
            <div>
                <form>
                    <label>Location:</label>
                    <input type="text" onChange={this.updateFormState}></input>
                    <input type="submit" onClick={this.createNewSession}></input>
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.setState({caseId: this.props.id})
    }

}

export default NewSession