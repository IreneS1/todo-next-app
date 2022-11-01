import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


export default function ListItem({ item, deleteItem, checkItem }) {
    const [checked, setChecked] = React.useState(item.completed);

    // handle check sets checked status to true and calls call back function
    // checkItem with param of the item id
    const handleCheck = (event) => {
        setChecked(event.target.checked);
        const check = checkState()
        checkItem(item._id, check)
    };

    const handleDelete = () => {
        deleteItem(item._id)
    }



    // Function toggles between true and false checking state
    const checkState = () => {
        if (!checked) {
            return true
        } else {
            return false
        }
    }


    return (
        <Card elevation={8} sx={{ minWidth: 410, borderRadius: "18px" }}>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item xs >
                        <Checkbox
                            checked={checked}
                            onChange={handleCheck}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography
                            color="text.secondary"
                            style={{ textDecoration: checked ? 'line-through' : 'none' }}
                        >
                            {item.title}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={handleDelete}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
}