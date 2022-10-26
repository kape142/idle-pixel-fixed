declare global {
  class Crafting {
    static getOilPerBar: (ore: string) => number
    static getCharcoalPerBar: (ore: string) => number
    static getLavaPerBar: (ore: string) => number
  }
}

export {}