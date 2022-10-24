import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import connectMongo from '../../utils/connectMongo'
import List from '../../models/model.list'
import Item from '../../components/item'

/* UI list page where the list title and the list items show up*/
const ListPage = ({ list }) => {
    const router = useRouter()
    const [message, setMessage] = useState('')

    const handleDelete = async () => {
        const listID = router.query.id

        try {
            await fetch(`/api/test/${listID}`, {
                method: 'Delete',
            })
            router.push('/')
        } catch (error) {
            setMessage('Failed to delete the list.')
        }
    }

    return (
        <div key={list._id}>
            <p> This is {listId}</p>
            <Item />
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await connectMongo()

    const list = await List.findById(params.id).lean()
    list._id = list._id.toString()

    return { props: { list } }
}

export default ListPage