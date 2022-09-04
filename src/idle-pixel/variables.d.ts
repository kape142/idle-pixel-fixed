declare global {
    const switch_panels: (id: string) => void
    const websocket: WebSockeManager
    const get_image: (relativePath: string) => string
    const var_username: string | undefined
}

export {}