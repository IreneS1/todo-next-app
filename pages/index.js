import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Item from '../components/item'
import ListCard from '../components/listCard'
import { Typography } from '@mui/material'
import connectMongo from '../utils/connectMongo';
import List from '../models/model.list';
import UserInput from '../components/userInput'

export default function Home({ lists }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant='h2'> Your Task Lists</Typography>
        <UserInput />
        <ListCard />
        <br />
        <Item />
        <div>
          {lists.map((list) => (
            <a
              href="https://nextjs.org/docs"
              key={list._id}
            >
              <p>{list.title}</p>
            </a>
          ))}
        </div>
      </main >
    </div >
  )
}

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