import React, { useState, useEffect, memo } from 'react'
import './list.css'

const List = ({ itemsArray }) => (
    <div className="container">
            <ul>
                {itemsArray.map((item) => (
                    <li key={item}>item {item}</li>
                ))}
            </ul>
    </div>
)

export default memo(List)
