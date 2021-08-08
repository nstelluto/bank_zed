import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfoBank from './InfoBank';
import FormCreate from './FormCreate';

export default function CreateAccount() {

    return (
        <div>
            <Grid container>
                <Grid item sm={12} item lg={7}>
                    <Paper className="InfoBank">
                        <InfoBank />
                    </Paper>
                </Grid>
                <Grid item sm={12} lg={5}>
                    <Paper>
                        <FormCreate />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}