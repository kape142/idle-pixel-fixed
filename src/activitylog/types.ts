export interface ActivityLogItem {
    type: string
    timestamp: Date
    content: LootContent
}

export interface LootContent {
    extraData: string
    items: LootItem[]
}

export interface LootItem {
    image: string
    label: string
    background: string
}

export interface ActivityLogSettings {
    blockDialogues: boolean
}