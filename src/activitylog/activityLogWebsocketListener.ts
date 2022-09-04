import { onMessage } from "../util/websocket"

export const activityLogWebSocketListener = () => {
    onMessage((ev: MessageEvent<string>) => {
        return ev
    })
}