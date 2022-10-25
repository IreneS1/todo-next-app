import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ListCard from '../components/listCard'
import { Typography, Grid } from '@mui/material'
import connectMongo from '../utils/connectMongo';
import List from '../models/model.list';
import UserInput from '../components/userInput'


export default function Home({ lists }) {
  // stores getServerSideProps list from mongoDB into a state 
  // to be able to manipulate in the ui
  const [storedList, setStoredList] = React.useState(lists)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Typography className={styles.header} variant='h2'> Your Task Lists</Typography>
        <Grid item >
          <Typography variant='body1' color='text.secondary'>Collections:</Typography>
          <Grid item >
            <UserInput />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={6}
          direction='row'
          justifyContent="space-evenly"
          alignItems="center"
        >

          <br />
          {storedList.map((list) => (
            <Grid key={list._id} item xs={4}>
              <ListCard
                key={list._id}
                list={list}
              />
            </Grid>
          ))}
        </Grid>
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
    console.log('FETCHED DOCUMENTS');

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