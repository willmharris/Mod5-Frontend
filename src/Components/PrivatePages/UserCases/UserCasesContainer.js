import React, { Component } from 'react'
import UserCase from './UserCase.js'



class UserCasesContainer extends Component {
    
    constructor() {
        super()
        this.state = {
            userCases: null
        }
    }

    render() {
        return(
            <div>
               {this.state.userCases ? 
                    this.state.userCases.map(mappedUserCase => <UserCase admin={this.props.admin} userCase={mappedUserCase} clients={this.props.clients} />) 
                    : 
                    null
                }
            </div>
        )
    }

    componentDidMount() {
        let userCases = this.props.userCases.filter(userCase => userCase.case_id === this.props.id)
        this.setState({userCases: userCases})
    }
}

export default UserCasesContainer

