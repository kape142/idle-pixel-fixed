declare global {
  class Cooking {
    static getOven: () => string;
    static LOG_HEAT_MAP: Record<string, number>
    static getHeatPerLog(log: string): number
  }
}

export {};
