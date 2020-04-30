import React, { Component } from 'react'
import { Redirect } from 'react-router';
import CaseDisplay from './CaseDisplay.js'
import CaseEdit from './CaseEdit.js'

class Cases extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            currentCase: null,
            edit: false,
            redirect: false
        }
    }

    getCase = () => {
        let theCase = this.props.cases.filter(theCase => theCase.id === this.state.id)[0]
        this.setState({currentCase: theCase})
    }

    updateCase = (newCase) => {
        this.setState({currentCase: newCase})
    }

    deleteCase = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/cases/${this.state.id}`, {
            method: "DELETE"
        }).then(
            resp => resp.json()
        ).then(
            data => this.props.removeCase(data)

        ).then(
            this.setState({redirect: true})
        )
    }

    changeEditMode = (event) => {
        if (event) { event.preventDefault() }
        let newEditState = !this.state.edit
        this.setState({edit: newEditState})
    }

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.edit ? 
                    <CaseEdit currentCase={this.state.currentCase} changeEditMode={this.changeEditMode} updateCase={this.updateCase} /> 
                    : 
                    <CaseDisplay currentCase={this.state.currentCase}/>
                }
                <br />
                {this.state.edit ? 
                    <button onClick={this.changeEditMode}>Display</button> 
                    : 
                    <button onClick={this.changeEditMode}>Edit</button>
                }
                <button onClick={this.deleteCase}>Delete case</button>
            </div>
        )
        
    }

    componentDidMount() {
        this.getCase()
    }
}

export default Cases
