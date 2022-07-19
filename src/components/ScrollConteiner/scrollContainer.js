import React, { useRef, useCallback } from "react"
import {useMount} from "react-use"

const ScrollContainer = ({ children, onScroll, onMount }) => {
    const containerRef = useRef(null)

    useMount(() => {
        onMount(containerRef.current)
    })

    const handleScroll = useCallback(
        event => {
            const { target } = event
            const scrollContainerRect = target.getBoundingClientRect()
            const scrollTop = target.scrollTop

            onScroll({ scrollTop, scrollContainerRect })
        },
        [onScroll]
    )

    return (
        <div className="container" onScroll={handleScroll} ref={containerRef}>
            {children}
        </div>
    )
}

export default ScrollContainer
