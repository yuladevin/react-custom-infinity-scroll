import React, { useState, useEffect, useRef } from "react"

const LazyLoader = ({
                        scrollTop,
                        rootBottomMargin = 0,
                        scrollContainerRect,
                        onIntersection,
                        children
                    }) => {
    const [scrollThreshold, setScrollThreshold] = useState(0)
    const fakeBottomRef = useRef(null)
    const fakeListRect = fakeBottomRef.current
        ? fakeBottomRef.current.getBoundingClientRect()
        : {}

    useEffect(() => {
        setScrollThreshold(
            fakeListRect.top - scrollContainerRect.top - scrollContainerRect.height
        )
    }, [scrollTop, scrollContainerRect, fakeListRect.top])

    useEffect(() => {
        if (scrollThreshold < rootBottomMargin) {
            onIntersection()
        }
    }, [scrollThreshold, rootBottomMargin, onIntersection])

    return (
        <div className="container">
            {children}
            <div className="buttom" ref={fakeBottomRef} />
        </div>
    )
}

export default LazyLoader
