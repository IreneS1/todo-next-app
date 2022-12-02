import React from "react";
import ListCard from "./listCard";
import { Grid } from "@mui/material";
import { IList } from "../utils/interfaces";

type TodoListProps = {
  storedList: IList[];
};

function TodoList({ storedList }: TodoListProps) {
  return (
    <Grid
      container
      spacing={6}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {storedList.map((list) => (
        <Grid key={list._id} item xs={4}>
          <ListCard key={list._id} list={list} />
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;
