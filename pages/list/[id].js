import { useState } from 'react'
import { useRouter } from 'next/router'
import connectMongo from '../../utils/connectMongo'
import List from '../../models/model.list'
import Item from '../../models/model.item'
import { Typography, Grid } from '@mui/material'
import ListItem from '../../components/ListItem'
import Head from 'next/head'
import UserInput from '../../components/userInput'

/* UI list page where the list title and the list items show up*/
const ListPage = ({ list, tasks }) => {
    const router = useRouter()

    const [storedItems, setStoredItems] = useState(tasks)
    const [listId, setListId] = useState(list._id)

    console.log("stored:", storedItems)

    // Call back funtion for userInput
    // POSTS to mongoDB new item 
    const addItem = async (newItem, listId) => {
        const res = await fetch('/api/lists/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newItem,
                listId: listId
            }),
        });
        const data = await res.json();
        console.log(data);
        const newItems = [...storedItems, data.item]
        setStoredItems(newItems)
    }

    return (
        <div >
            <Head>
                <title>{list.title} List</title>
                <meta name="description" content="Todo List App" />
            </Head>
            <Typography variant='h2'>{list.title}</Typography>
            <Grid
                container
                spacing={10}
                direction='row'
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid item xs={8}>
                    <Typography variant='body1' color='text.secondary'>Tasks:</Typography>
                </Grid>
                <Grid item xs={4}>
                    <UserInput onAdd={addItem} inputValue={`Task`} listId={listId} />
                </Grid>
            </Grid>
            <br />
            {storedItems.map((tasks) => (
                <Grid key={tasks._id} item>
                    <ListItem
                        key={tasks._id}
                        item={tasks}
                    />
                </Grid>
            ))}
        </div>
    )
}

export async function getServerSideProps({ params }) {

    await connectMongo()

    // console.log(params) // list id
    const list = await List.findById(params.id).lean()
    list._id = list._id.toString()

    const data = await Item.find({ listId: params.id, isDeleted: false })
    const tasks = data.map((doc) => {
        const task = doc.toObject()
        task._id = doc._id.toString()
        task.listId = doc.listId.toString()
        return task
    })
    return {
        props: {
            list,
            tasks: tasks,
        },

    }
}

export default ListPage