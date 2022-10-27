import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TodoList from '../components/TodoList'
import { Typography, Grid } from '@mui/material'
import connectMongo from '../utils/connectMongo';
import List from '../models/model.list';
import UserInput from '../components/userInput'


export default function Home({ lists }) {
  // stores getServerSideProps list from mongoDB into a state 
  // to be able to manipulate in the ui
  const [storedList, setStoredList] = React.useState(lists)

  // Call back funtion for userInput
  // POSTS to mongoDB new list 
  const addList = async (newList) => {
    const res = await fetch('/api/lists/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newList,
      }),
    });
    const data = await res.json();
    console.log(data);
    const newLists = [...storedList, data.list]
    setStoredList(newLists)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant='h2'> Your Task Lists</Typography>
        <Grid
          container
          spacing={10}
          direction='row'
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant='body1' color='text.secondary'>Collections:</Typography>
          </Grid>
          <Grid item xs={4}>
            <UserInput onAdd={addList} inputValue={`List`} />
          </Grid>
        </Grid>
        <br />
        <TodoList storedList={storedList} />
      </main >
    </div >
  )
}

// Retrieves list from MongoDB
export const getServerSideProps = async () => {
  try {
    await connectMongo();
    console.log('FETCHING DOCUMENTS');
    const lists = await List.find();

    return {
      props: {
        lists: JSON.parse(JSON.stringify(lists)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};