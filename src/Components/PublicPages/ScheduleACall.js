import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Calender from './Calender'
import { Grid, Button } from 'semantic-ui-react'

class ScheduleACall extends Component {

    constructor() {
        super()
        this.state = {showCalender: false}
    }
    
    render() {
        return(
            <React.Fragment>
                {this.state.showCalender ? 
                    <Calender />
                    :
                    <Grid rows={3} style={{paddingLeft: 75, paddingTop: 50}}>
                        <Grid.Row style={{paddingLeft:200}}>
                            <p style={{fontSize: 45}}>Let us know what time works best for you!</p>
                        </Grid.Row>
                        <Grid.Row style={{paddingTop: 75, paddingLeft: 300}}>      
                            <Button primary style={{fontSize: 45}} onClick={() => this.setState({showCalender: true})}>Schedule a 15-minute Call</Button>
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: 500, paddingTop: 100}}>
                            <NavLink  to="/" ><Button secondary style={{fontSize: 20}}>Return to Homepage</Button></NavLink>
                        </Grid.Row>
                    </Grid>
                }       
            </React.Fragment>
        )
    }
}

export default ScheduleACall





 
                     