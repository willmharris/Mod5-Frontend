import React, { Component }  from 'react'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    
    constructor() {
        super()
        this.state = {
          email: null,
          password: null,
          redirect: null
        }
    }

    updateFormState = (event) => {
        let id = event.target.id
        let input = event.target.value
        if (id === "email") {
            this.setState({email: input})
        } else if (id === "password") {
            this.setState({password: input})
        } 
    }

    validate = (event) => {
        event.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://localhost:3000/login', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(
            resp => resp.json()
        ).then(
            data => {
                if (data === false) {
                    alert("This email and password combination is incorrect ")
                } else {
                    this.props.setUser(data)
                    if (data["account_type"] === 0) {
                        this.setState({redirect: "admin"})
                    }
                    if (data["account_type"] === 2) {
                        this.setState({redirect: "your-case"})
                    }
                }
            }
        )
    }

    render() {
        
        if (this.state.redirect === "admin"){
            return <Redirect to="/admin" />
        }

        if (this.state.redirect === "your-case"){
            return <Redirect to="/your-case" />
        }

        return(
            <div>
                <form>
                    <label>Email:</label>
                    <input id="email" type="text" onChange={this.updateFormState}></input>
                    <label>Password:</label>
                    <input id="password" type="text" onChange={this.updateFormState}></input>
                    <input type="submit" onClick={this.validate}></input>
                </form>
            </div>
        )
    }
}

export default Login