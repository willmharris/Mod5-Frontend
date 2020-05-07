import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Form, Grid, Card } from 'semantic-ui-react'

class NewCase extends Component {
    
    constructor() {
        super()
        this.state = {
            plannedDate: null,
            plannedLocation: null,
            firstClient: null,
            secondClient: null,
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
        }
    }

    createNewCase = (event) => {
        event.preventDefault()
        let data = {
            planned_date: this.state.plannedDate,
            planned_location: this.state.plannedLocation,
            first_client: this.state.firstClient,
            second_client: this.state.secondClient
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

    addToCase(client) {
        console.log('working')
        if (!this.state.firstClient) {
            this.setState({firstClient: client})
        } else if (!this.state.secondClient) {
            this.setState({secondClient: client})
        }
    }
    
    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to='/admin' />
        }
        
        return(
            <div>
                <p style={{textAlign: "center", paddingTop: 0, fontSize: 40 }}>Create a new case</p>
                <Form style={{padding: "0px 500px 0px 500px"}}>
                    <Form.Field>
                        <label style={{fontSize: 20}}>Planned Date:</label>
                        <input type="date" id="plannedDate" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Form.Field>
                    <label style={{fontSize: 20}}>Planned Location:</label>
                    <input type="text" id="plannedLocation" onChange={this.updateFormState}></input>
                    </Form.Field>
                    <Button primary type="submit" onClick={this.createNewCase}>Submit</Button>
                </Form>
                <Grid columns={2} rows={2} style={{paddingLeft: 200, paddingTop: 25}}>
                    <Grid.Column>
                        <Grid.Row>
                            <p style={{fontSize: 40, paddingBottom: 25}}>Clients </p>
                        </Grid.Row>
                        <Grid.Row>
                            {this.props.clients.map(client => {
                                return( 
                                    <Card style={{fontSize: 20, backgroundColor: "teal", color: "white"}} onClick={() => this.addToCase(client)}>
                                        <Card.Content>{client.first_name} {client.last_name}</Card.Content>
                                    </Card>
                                )
                            })}
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <p style={{fontSize: 40, paddingBottom: 25}}>Participants</p>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: 25}}>
                            {this.state.firstClient ?
                                <Card style={{fontSize: 20, backgroundColor: "teal", color: "white"}}>
                                    <Card.Content>
                                        {this.state.firstClient.first_name} { this.state.firstClient.last_name}
                                    </Card.Content>
                                </Card>
                                :
                                null
                            }
                        </Grid.Row>
                        <Grid.Row>
                            {this.state.secondClient ?
                                <Card style={{fontSize: 20, backgroundColor: "teal", color: "white"}}>
                                    <Card.Content>
                                        {this.state.secondClient.first_name} {this.state.secondClient.last_name}
                                    </Card.Content>
                                </Card>
                                :
                                null
                            }
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default NewCase
