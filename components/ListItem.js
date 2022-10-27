import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


export default function ListItem({ item }) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Card elevation={8} sx={{ minWidth: 410, borderRadius: "18px" }}>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item xs >
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography color="text.secondary" >
                            {item.title}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
}