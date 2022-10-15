interface MachineData {
  level: number;
}

export const MACHINES: Record<string, MachineData> = {
  drill: {
    level: 1,
  },
  crusher: {
    level: 10,
  },
  giant_drill: {
    level: 25,
  },
  excavator: {
    level: 60,
  },
};
