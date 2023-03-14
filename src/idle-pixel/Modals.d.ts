declare global {
    class Modals {
        static clicks_rocket: () => void
        static clicks_oven_log: (log: string) => void
        static open_custom_crafting: (log: string) => void
        static open_input_dialogue_with_value: (type: string, action1: string, text: string, value: number, action2: string) => void
    }
}

export { }