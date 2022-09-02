export interface ActivityLogItem {
    type: string
    timestamp: Date
    content: LootContent
}

export interface LootContent {
    title: string
    items: {
        image: string
        label: string
        background: string
    }[]
}
