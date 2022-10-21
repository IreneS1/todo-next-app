import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Item from '../components/item'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Item />
      </main >
    </div >
  )
}
