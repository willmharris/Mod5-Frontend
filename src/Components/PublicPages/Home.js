import React from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Image, Button } from 'semantic-ui-react'

export default function Home() {

    return (
        <Grid columns={2} style={{paddingLeft: 75, paddingTop: 100}}>
            <Grid.Column style={{paddingTop: 130}}>
                <div style={{fontSize: 75}}>
                    Humanz Mediate
                </div>
                <br />
                <br />
                <br />
                <div style={{fontSize: 30}}>
                    Resolving conflict one conversation at a time
                </div>
            </Grid.Column>
            <Grid.Column style={{fontSize: 30, paddingLeft: 20}}>
                <Image size='large' src="https://juliuslawoffices.com/wp-content/uploads/2016/12/Myths-About-Mediation.png" />
                <br />
                <br />
                <br />
                <Button style={{paddingLeft: 50, fontSize: 40}}><NavLink to="/Mod5-Frontend/what-is-mediation">Learn more about us</NavLink></Button>
            </Grid.Column>
        </Grid>
        
    )
      
}

