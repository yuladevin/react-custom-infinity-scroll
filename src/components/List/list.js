import React, { useState, useEffect } from 'react'
import './list.css'

const List = () => {
    const [itemsArray, setItemsArray] = useState([])
    const [fetching, setFetching] = useState(false)
    const [container, setContaiter] = useState(1)

    useEffect(() => {
        fetchItems()
        window.addEventListener('scroll', handleScrolling)
    }, [])

    const handleScrolling = () => {
        if (
            Math.ceil(document.documentElement.scrollTop + window.innerHeight) !== document.documentElement.offsetHeight
            || fetching
        ) return

        setFetching(true)
    }
    const fetchItems = async () => {
        setTimeout(async () => {
            const result = await fetch(`https://picsum.photos/v2/list?page=${container}`)
            const items = await result.json()
            setContaiter(container + 1)
            setItemsArray(() => {
                return [...itemsArray, ...items]
            })
        }, 1000)
    }

    useEffect(() => {
        if (!fetching) return
        fetchMoreItems()
    }, [fetching])

    const fetchMoreItems = () => {
        fetchItems()
        setFetching(false)
        console.log('fetchMoreItems')
    }

    return (
        <>
            <ul>
            {itemsArray.map((item) => (
                    <li key={item.id}>item {item.id}</li>
            ))}
            </ul>
            {fetching &&
                <h2>Fetching more items...</h2>
            }
        </>
    )
}

export default List
