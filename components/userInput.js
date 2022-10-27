import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, FormControl, InputLabel, InputAdornment, Input } from '@mui/material';

export default function userInput({ onAdd, inputValue, listId }) {
    const [userInput, setUserInput] = React.useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setUserInput(e.target.value);
    }

    // onClick the List title POST to mongoDB
    const handleAdd = (e) => {
        e.preventDefault();
        console.log("This is the userInput", userInput);
        onAdd(userInput, listId);
        setUserInput('');
    }


    return (
        <>
            <FormControl sx={{ width: '20ch' }} variant="standard">
                <InputLabel htmlFor="standard-input">Add {inputValue}</InputLabel>
                <Input
                    id="List"
                    type='text'
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Add list"
                                onClick={handleAdd}
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