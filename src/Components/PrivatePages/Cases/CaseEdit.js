import React, { Component } from 'react'
import { Redirect } from 'react-router';

class CaseEdit extends Component {
    
    constructor() {
        super()
        this.state = {
            active: null,
            plannedDate: null,
            plannedLocation: null,
            confirmedDate: null,
            confirmedLocation: null,
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
        } else if (id === "confirmedDate") {
            this.setState({confirmedDate: input})
        } else if (id === "confirmedLocation") {
            this.setState({confirmedLocation: input})
        }
    }

    editCase = (event) => {
        event.preventDefault()
        let data = {
            active: this.state.active,
            planned_date: this.state.plannedDate,
            planned_location: this.state.plannedLocation,
            confirmed_date: this.state.confirmedDate,
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
            this.props.changeEditMode()
        )
    }

    activate = () => {
        this.setState({active: true})
    }

    deactivate = () => {
        this.setState({active: false})
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                <form>
                    {this.props.currentCase.active ? 
                        <label>Deactivate:</label>
                        :
                        <label>Activate:</label>
                    }
                    {this.props.currentCase.active ? 
                        <input type="checkbox" onChange={this.deactivate}></input>
                        :
                        <input type="checkbox" onChange={this.activate}></input>
                    }
                    <br />
                    <label>Planned Date: {this.state.plannedDate ? this.state.plannedDate.substring(0, 10) : null} </label>
                    <input type="date" id="plannedDate" onChange={this.updateFormState}></input>
                    <br />
                    <label>Planned Location:</label>
                    <input type="text" id="plannedLocation" value={this.state.plannedLocation} onChange={this.updateFormState}></input>
                    <br />
                    <label>Confirmed Date: {this.state.confirmedDate ? this.state.confirmedDate.substring(0, 10) : null} </label>
                    <input type="date" id="confirmedDate" onChange={this.updateFormState}></input>
                    <br />
                    <label>Confirmed Location:</label>
                    <input type="text" id="confirmedLocation" value={this.state.confirmedLocation} onChange={this.updateFormState}></input>
                    <br />
                    <input type="submit" onClick={this.editCase}></input>
                </form>
            </div>
        )
    }

    componentDidMount() {
        let currentCase = this.props.currentCase
        this.setState({
            active: currentCase.active,
            plannedDate: currentCase.planned_date,
            plannedLocation: currentCase.planned_location,
            confirmedDate: currentCase.confirmed_date,
            confirmedLocation: currentCase.confirmed_location
        })
    }
}

export default CaseEdit
