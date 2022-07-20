import React, { useState, useCallback, memo, lazy, Suspense } from "react"
import throttle from "lodash/throttle"
import {nanoid} from "nanoid"

const List = lazy(()=>import('./components/List/list'))
const LazyLoad = lazy(()=>import('./components/LazyLoad/lazyLoad'))
const ScrollContainer = lazy(()=>import('./components/ScrollConteiner/scrollContainer'))

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
			<Suspense fallback="Loading...">
				<ScrollContainer onScroll={onScroll} onMount={onMount}>
					<Suspense fallback="Loading...">
						<LazyLoad
							scrollTop={scrollTop}
							scrollContainerRect={scrollContainerRect}
							onIntersection={appendItems}
						>
							<Suspense fallback="Loading...">
								<List itemsArray={items} />
							</Suspense>
						</LazyLoad>
					</Suspense>
				</ScrollContainer>
			</Suspense>
		</div>
	)
}
export default memo(App)
