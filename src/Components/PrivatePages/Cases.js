import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Cases extends Component {

    constructor() {
        super()
        this.state = {
            id: parseInt(window.location.hash.substring(1)),
            currentCase: null,
            redirect: false
        }
    }

    getCase = () => {
        let caseVariable = this.props.cases.filter(thisCase => thisCase.id === this.state.id)[0]
        this.setState({currentCase: caseVariable})
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

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                {this.state.currentCase ? this.state.currentCase.active_status : null} 
                <br />
                {this.state.currentCase ? this.state.currentCase.confirmed_location : null} 
                <br />
                <button onClick={this.deleteCase}>Delete case</button>
            </div>
        )
        
    }

    componentDidMount() {
        this.getCase()
    }
}

export default Cases
