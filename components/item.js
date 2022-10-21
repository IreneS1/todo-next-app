import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


export default function item() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Card elevation={8} sx={{ minWidth: 400, borderRadius: "18px" }}>
            <CardContent>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography color="text.secondary" >
                            Todo Item
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton><DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
}