import React from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

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
                <Image size='large' src="https://news.stlpublicradio.org/sites/kwmu/files/styles/medium/public/201712/12047_DK_Mediation_Illus.png" />
                <br />
                <br />
                <br />
                <div style={{paddingLeft: 50, fontSize: 40}}><NavLink to="/what-is-mediation">Learn more about us </NavLink></div>
            </Grid.Column>
        </Grid>
        
    )
      
}

