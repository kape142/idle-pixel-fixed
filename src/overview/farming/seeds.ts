interface SeedData {
  id: string;
  level: number;
  stopsDying: number;
  time: number;
  bonemealCost: number;
}

export const SEEDS: Record<string, SeedData> = {
  dotted_green_leaf_seeds: {
    id: "dotted_green_leaf_seeds",
    level: 1,
    stopsDying: 15,
    time: 15,
    bonemealCost: 0,
  },
  stardust_seeds: {
    id: "stardust_seeds",
    level: 8,
    stopsDying: 0,
    time: 20,
    bonemealCost: 0,
  },
  green_leaf_seeds: {
    id: "green_leaf_seeds",
    level: 10,
    stopsDying: 25,
    time: 30,
    bonemealCost: 0,
  },
  lime_leaf_seeds: {
    id: "lime_leaf_seeds",
    level: 25,
    stopsDying: 40,
    time: 60,
    bonemealCost: 1,
  },
  gold_leaf_seeds: {
    id: "gold_leaf_seeds",
    level: 50,
    stopsDying: 60,
    time: 2 * 60,
    bonemealCost: 10,
  },
  crystal_leaf_seeds: {
    id: "crystal_leaf_seeds",
    level: 70,
    stopsDying: 80,
    time: 5 * 60,
    bonemealCost: 25,
  },
  red_mushroom_seeds: {
    id: "red_mushroom_seeds",
    level: 1,
    stopsDying: 0,
    time: 5,
    bonemealCost: 0,
  },
  tree_seeds: {
    id: "tree_seeds",
    level: 10,
    stopsDying: 25,
    time: 5 * 60,
    bonemealCost: 10,
  },
  oak_tree_seeds: {
    id: "oak_tree_seeds",
    level: 25,
    stopsDying: 40,
    time: 4 * 60,
    bonemealCost: 25,
  },
  willow_tree_seeds: {
    id: "willow_tree_seeds",
    level: 37,
    stopsDying: 55,
    time: 8 * 60,
    bonemealCost: 50,
  },
  maple_tree_seeds: {
    id: "maple_tree_seeds",
    level: 50,
    stopsDying: 65,
    time: 12 * 60,
    bonemealCost: 120,
  },
  stardust_tree_seeds: {
    id: "stardust_tree_seeds",
    level: 65,
    stopsDying: 80,
    time: 15 * 60,
    bonemealCost: 150,
  },
  pine_tree_seeds: {
    id: "pine_tree_seeds",
    level: 70,
    stopsDying: 85,
    time: 17 * 60,
    bonemealCost: 180,
  },
};
