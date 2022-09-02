import { useState, useEffect } from 'react'
import {LootContent} from "../types";

interface Props{
    content: LootContent
}

const LootEntry = ({ content }: Props)  => {

    return (
        <div>
            <span>{content.title}</span>
            {content.items.map(item => (
                <div>{item.label}</div>
            ))}
        </div>
    )
}

export default LootEntry
