import React, { useState, useCallback } from "react"
import throttle from "lodash/throttle"
import {nanoid} from "nanoid"

import List from "./components/List/list"
import LazyLoad from "./components/LazyLoad/lazyLoad"
import ScrollContainer from "./components/ScrollConteiner/scrollContainer"

function App() {
	const [scrollContainerRect, setScrollContainerRect] = useState({})
	const [scrollTop, setScrollTop] = useState(0)
	const [items, setItems] = useState(
		Array(50).fill("").map(item=>nanoid(5))
	)

	const onScroll = useCallback(
		throttle(({ scrollTop, scrollContainerRect }) => {
			setScrollContainerRect(scrollContainerRect)
			setScrollTop(scrollTop)
		}, 10),
		[setScrollContainerRect, setScrollTop]
	)

	const onMount = useCallback(
		ref => {
			setScrollContainerRect(ref.getBoundingClientRect())
		},
		[setScrollContainerRect]
	)

	const appendItems = useCallback(() => {
		setItems([
			...items,
			...Array(10).fill("").map(item=>nanoid(5))
		])
	}, [items, setItems])

	return (
		<div className="App">
			<ScrollContainer onScroll={onScroll} onMount={onMount}>
				<LazyLoad
					scrollTop={scrollTop}
					scrollContainerRect={scrollContainerRect}
					onIntersection={appendItems}
				>
					<List itemsArray={items} />
				</LazyLoad>
			</ScrollContainer>
		</div>
	)
}
export default App
