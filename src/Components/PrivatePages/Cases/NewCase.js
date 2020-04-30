import React, { Component } from 'react'
import { Redirect } from 'react-router';

class NewCase extends Component {
    
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

    createNewCase = (event) => {
        event.preventDefault()
        let data = {
            confirmed_location: this.state.confirmedLocation
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
            </div>
        )
    }
}

export default NewCase
