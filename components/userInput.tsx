import React, { ChangeEvent, MouseEvent } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
} from "@mui/material";

interface UserInputProps {
  onAdd: Function;
  inputValue: string;
  listId?: string;
}

export default function userInput({
  onAdd,
  inputValue,
  listId,
}: UserInputProps) {
  const [userInput, setUserInput] = React.useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  // onClick the List title POST to mongoDB
  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("This is the userInput", userInput);
    onAdd(userInput, listId);
    setUserInput("");
  };

  return (
    <>
      <FormControl sx={{ width: "20ch" }} variant="standard">
        <InputLabel htmlFor="standard-input">Add {inputValue}</InputLabel>
        <Input
          id="List"
          type="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Add list" onClick={handleAdd}>
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}
