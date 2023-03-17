declare global {
  class Ores {
    static MINERALS_XP_MAP: Record<string, number>
    static getOilCost: (machine: string) => number
  }
}

export {}