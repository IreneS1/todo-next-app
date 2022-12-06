import { useState } from "react";
import connectMongo from "../../utils/connectMongo";
import List from "../../models/model.list";
import Item, { IItemSchema } from "../../models/model.item";
import { Typography, Grid } from "@mui/material";
import ListItem from "../../components/ListItem";
import Head from "next/head";
import UserInput from "../../components/userInput";
import styles from "../../styles/List.module.css";
import BackButton from "../../components/BackButton";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { IItem, IList } from "../../utils/interfaces";

type ListPageProps = {
  list: IList;
  items: IItem[];
};

/* UI list page where the list title and the list items show up*/
const ListPage = ({ list, items }: ListPageProps) => {
  const [storedItems, setStoredItems] = useState<IItem[]>(items);
  const [listId, setListId] = useState(list._id);

  // Call back funtion for userInput
  // POSTS to mongoDB new item
  const addItem = async (newItem: string, listId: string) => {
    const res = await fetch("/api/lists/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newItem,
        listId: listId,
      }),
    });
    const data = await res.json();
    const newItems = [...storedItems, data.item];
    setStoredItems(newItems);
  };

  // Handle soft delete with PUT
  const deleteItem = async (itemId: string) => {
    const res = await fetch(`/api/lists/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDeleted: true }),
    });
    const item = await res.json();
    let index = storedItems.findIndex((i) => i.title === item.data.title);
    storedItems.splice(index, 1);
    let emptyArray: IItem[] = [];
    const newTodoItems: IItem[] = emptyArray.concat(storedItems);
    setStoredItems(newTodoItems);
  };

  // Check box with PUT
  const checkItem = async (itemId: string, check: boolean) => {
    if (check === false) {
      const res = await fetch(`/api/lists/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: false }),
      });
    } else {
      const res = await fetch(`/api/lists/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
    }
    // const item = await res.json();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{list.title} List</title>
        <meta name="description" content="Todo List App" />
      </Head>
      <main className={styles.main}>
        <Grid container direction="row" justifyContent="flex-start">
          <Grid item>
            <BackButton />
          </Grid>
        </Grid>
        <Typography variant="h2">{list.title}</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="body1" color="text.secondary">
              Tasks:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <UserInput onAdd={addItem} inputValue={`Task`} listId={listId} />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {storedItems.map((tasks) => (
            <Grid key={tasks._id} item>
              <ListItem
                key={tasks._id}
                item={tasks}
                deleteItem={deleteItem}
                checkItem={checkItem}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectMongo();
  const { id } = context.query; // list id
  const list = await List.findById(id).lean();
  if (!list) {
    throw new Error("List not found");
  }
  list._id = list._id.toString();

  const data = await Item.find({ listId: id, isDeleted: false });
  //console.log("data item:", data);
  const items = data.map((doc) => {
    const item = doc.toObject();
    item._id = doc._id.toString();
    item.listId = doc.listId.toString();
    return item;
  });
  return {
    props: {
      list,
      items: items,
    },
  };
};

export default ListPage;
