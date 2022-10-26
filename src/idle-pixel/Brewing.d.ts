declare global {
  class Brewing {
    static POTION_TIMERS: Record<string, number>
    static get_ingredients: (potion: string) => string[]
    static get_potion_timer: (potion: string) => number
  }
}

export {}