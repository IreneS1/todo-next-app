import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Item from '../components/item'
import ListCard from '../components/listCard'
import { Typography } from '@mui/material'
import connectMongo from '../utils/connectMongo';
import List from '../models/model.list';

export default function Home({ lists }) {

  const listTest = async () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const res = await fetch('/api/test/addList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `List ${randomNum}`,
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant='h2'> Your Task Lists</Typography>
        <button onClick={listTest}>Create List</button>
        <ListCard />
        <br />

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