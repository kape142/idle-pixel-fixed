declare global {
    class WebSockeManager {
        close: () => void
        connect: () => void
        connected_socket: WebSocket
        send: (message: string) => void
    }
}

export {}