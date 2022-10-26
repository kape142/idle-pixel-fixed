interface MachineData {
  level: number;
  items: string[];
}

export const MACHINES: Record<string, MachineData> = {
  drill: {
    level: 1,
    items: ["stone", "copper", "iron", "silver"],
  },
  crusher: {
    level: 10,
    items: ["stone", "copper", "iron", "silver", "gold"],
  },
  giant_drill: {
    level: 25,
    items: ["silver", "gold", "promethium"],
  },
  excavator: {
    level: 60,
    items: ["gold", "promethium", "titanium"],
  },
};
