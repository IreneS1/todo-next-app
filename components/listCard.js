import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { CardActionArea } from "@mui/material"
import Box from '@mui/material/Box';

export default function listCard() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Card elevation={8} sx={{ minWidth: 400, borderRadius: "10px" }}>
            <CardActionArea>
                <CardContent>
                    <Box
                        sx={{
                            height: 150,
                        }}
                    >
                        <Grid container alignItems='center'>
                            <Grid item >
                                <Typography variant="h5">
                                    Todo List
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}