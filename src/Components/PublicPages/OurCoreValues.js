import React from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'

function OurCoreValues() {
    return(
        <div>
            <Grid columns={2} rows={2} style={{paddingLeft: 75, paddingTop: 100}}>
                <Grid.Row>
                    <Grid.Column>
                        <p style={{fontSize: 50}}>What is mediation? </p>
                        <p style={{fontSize: 20, paddingTop: 15}}>
                            Mediation is a conflict resolution process in which mediators help participants have a difficult conversation, 
                            get clear about what’s important to everyone, 
                            and make decisions that meet the needs of those involved. 
                        </p>
                        <p style={{fontSize: 20}}>In mediation, people speak for themselves and make their own decisions.</p>
                    </Grid.Column>
                    <Grid.Column style={{fontSize: 15, paddingLeft: 60, paddingRight: 60}}>
                        <p style={{fontSize: 50}}>Mediation is:</p>
                        <p style={{fontSize: 20}}>Neutral: mediators do not take sides, and try to ensure everyone feels heard. </p>
                        <p style={{fontSize: 20}}>Voluntary: participants agree to every step of the process. </p>
                        <p style={{fontSize: 20}}>Confidential: mediators are bound by law to keep all conversations private. </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{paddingTop: 100}}>
                    <Button><NavLink to="/get-in-touch"><p style={{fontSize: 35, paddingLeft:230}}>Get in touch with us to see if mediation is right for you!</p></NavLink></Button>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default OurCoreValues