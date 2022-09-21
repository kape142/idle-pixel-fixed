declare global {
  class Items {
    static getItem: (key: string) => string
    static get_pretty_item_name: (key: string) => string
    static set: (key: string, value: string) => void
  }
}

export {}