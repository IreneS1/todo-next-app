import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, FormControl, InputLabel, InputAdornment, Input } from '@mui/material';

export default function userInput() {
    const [userInput, setUserInput] = React.useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setUserInput(e.target.value);
    }

    // onClick the List title POST to mongoDB
    const handleClick = async () => {
        const res = await fetch('/api/lists/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: userInput,
            }),
        });
        const data = await res.json();
        console.log(data);
        setUserInput('')
    }


    return (
        <>
            <FormControl sx={{ width: '20ch' }} variant="standard">
                <InputLabel htmlFor="standard-input">Add List</InputLabel>
                <Input
                    id="List"
                    type='text'
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Add list"
                                onClick={handleClick}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    )
};