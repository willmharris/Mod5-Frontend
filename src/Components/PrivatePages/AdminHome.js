import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Button, Card } from 'semantic-ui-react'
import './AdminHome.css'

class AdminHome extends Component {
    
    displayLeads = () => {
        return (
            <div> 
                {this.props.leads.map(lead => {
                    return (
                        <NavLink to={`/admin/leads/#${lead.id}`} exact style={{color: "white"}}>
                            <Card style={{fontSize: 20, backgroundColor: "teal"}}>
                                <Card.Content>{lead.first_name} {lead.last_name}</Card.Content>
                            </Card>
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    displayClients = () => {
        return (
            <div> 
                {this.props.clients.map(client => {
                    return (
                        <NavLink to={`/admin/clients/#${client.id}`} exact style={{color: "white"}}>
                            <Card style={{fontSize: 20, backgroundColor: "teal"}}>
                                <Card.Content>{client.first_name} {client.last_name}</Card.Content>
                            </Card>
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    displayCases = () => {
        return (
            <div> 
                {this.props.cases.map(specificCase => {
                    return (
                        <NavLink to={`/admin/cases/#${specificCase.id}`} exact style={{color: "white"}}> 
                            <Card style={{fontSize: 20, backgroundColor: "teal"}}>
                                <Card.Content>
                                    {specificCase.planned_location} 
                                    <br />
                                    {specificCase.planned_date ? specificCase.planned_date.substring(0, 10) : null} 
                                </Card.Content>
                            </Card>
                        </NavLink> 
                    )
                })}
            </div>
        )
    }

    render() {
        return(
            <Grid columns={3} rows={3} style={{paddingLeft: 75, paddingTop: 25}}>
                <Grid.Row>
                    <Grid.Column>
                        <NavLink to={`/admin/new-lead`} exact><Button primary style={{fontSize: 25}}>Add a new lead</Button></NavLink>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column style={{paddingLeft: 0}}>
                        <NavLink to={`/admin/new-case`} exact><Button primary style={{fontSize: 25}}>Add a new case</Button></NavLink>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{fontSize: 30}}>Leads</div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={{fontSize: 30}}>Clients</div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={{fontSize: 30}}>Cases</div>
                    </Grid.Column>
                </Grid.Row>
               <Grid.Row>
                   <Grid.Column> 
                       {this.props.leads ? this.displayLeads() : null}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.clients ? this.displayClients() : null}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.cases ? this.displayCases() : null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    componentDidMount() {
        this.props.getServerInfo()
    }
}

export default AdminHome

 