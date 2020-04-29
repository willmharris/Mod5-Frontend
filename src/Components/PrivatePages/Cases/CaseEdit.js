import React, { Component } from 'react'
import { Redirect } from 'react-router';

class CaseEdit extends Component {
    
    constructor() {
        super()
        this.state = {
          confirmedLocation: null,
          redirect: false
        }
    }

    updateFormState = (event) => {
        let input = event.target.value
        this.setState({confirmedLocation: input})
      
    }

    editCase = (event) => {
        event.preventDefault()
        let data = {
            confirmed_location: this.state.confirmedLocation
        }
        fetch(`http://localhost:3000/cases/${this.props.currentCase.id}`, {
            method: "PATCH", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.updateCase(data)
        ).then(
            this.props.changeMode()
        )
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                <form>
                    <label>Confirmed Location:</label>
                    <input type="text" value={this.state.confirmedLocation} onChange={this.updateFormState}></input>
                    <input type="submit" onClick={this.editCase}></input>
                </form>
            </div>
        )
    }

    componentDidMount() {
        let currentCase = this.props.currentCase
        this.setState({confirmedLocation: currentCase.confirmed_location})
    }
}

export default CaseEdit
