import { useState } from 'react'
import { useRouter } from 'next/router'
import connectMongo from '../../utils/connectMongo'
import List from '../../models/model.list'
import Item from '../../models/model.item'
import { Typography, Grid } from '@mui/material'
import ListItem from '../../components/ListItem'

/* UI list page where the list title and the list items show up*/
const ListPage = ({ list, items }) => {
    const router = useRouter()

    const [storedItems, setStoredItems] = useState(items)
    console.log(storedItems)



    return (
        <div>
            <Typography variant='h2'>{list.title} {list._id}</Typography>
            <br />
            {storedItems.map((item) => (
                <ListItem
                    key={item._id}
                    item={item}
                />
            ))}
        </div>
    )
}

export async function getServerSideProps({ params }) {

    await connectMongo()

    console.log(params) // list id
    const list = await List.findById(params.id).lean()
    list._id = list._id.toString()

    const itemsRes = await Item.find({ deleted: false })
    const items = itemsRes.map((doc) => {
        const item = doc.toObject()
        item._id = doc._id.toString()
        item.listId = doc.listId.toString()
        return item
    })
    return {
        props: {
            list,
            items: items,
        },

    }
    console.log()
    return { props: { list } }

}

// export async function getServerSideProps({ params }) {
//     try {
//         await connectMongo()
//         const result = await List.findById(params.id).lean()
//         list._id = result._id.toString()
//         const itemsRes = await Item.find({ deleted: false })
//         // const lists = result.map((doc) => {
//         //     const list = doc.toObject()
//         //     list._id = list._id.toString()
//         //     return list
//         // })
//         const items = itemsRes.map((doc) => {
//             const item = doc.toObject()
//             item._id = doc._id.toString()
//             item.listId = doc.listId.toString()
//             return item
//         })
//         return {
//             props: {
//                 items: items,
//             },
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

export default ListPage