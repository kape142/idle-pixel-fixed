declare global {
  class Items {
    static getItem: (key: string) => number
    static get_pretty_item_name: (key: string) => string
  }
}

export {}