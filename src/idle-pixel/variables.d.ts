declare global {
    let switch_panels: (id: string) => void
    const websocket: WebSockeManager
    const get_image: (relativePath: string) => string
    const var_username: string | undefined
    const format_time: (time: number) => string
    const get_level: (xp: number) => number
}

export {}