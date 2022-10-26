interface AreaData {
  image: string;
  name: string;
  items: string;
  getUnlocked: () => boolean;
}

const getUnlockedFactory =
  (...skills: string[]) =>
  () =>
    !!Number(Items.getItem("gathering_unlocked")) &&
    skills
      .map((skill) => !!Number(Items.getItem(`${skill}_unlocked`)))
      .reduce((acc, cur) => acc && cur, true);

export const AREAS: Record<string, AreaData> = {
  mines: {
    image: "mine",
    name: "Desert mines",
    items: "Stone, Rocket Fuel",
    getUnlocked: getUnlockedFactory(),
  },
  fields: {
    image: "field",
    name: "Forever fields",
    items: "Bones, Seeds",
    getUnlocked: getUnlockedFactory("farming"),
  },
  forest: {
    image: "forest",
    name: "Friendly forest",
    items: "Big Bones, Leaves, Wood",
    getUnlocked: getUnlockedFactory("woodcutting"),
  },
  fishing_pond: {
    image: "fishing_pond",
    name: "Quiet pond",
    items: "Seaweed, Bait",
    getUnlocked: getUnlockedFactory("fishing"),
  },
  kitchen: {
    image: "kitchen",
    name: "Dirty kitchen",
    items: "Maggots, Eggs, Chocolate, Flour",
    getUnlocked: getUnlockedFactory("cooking"),
  },
  gem_mine: {
    image: "gem_mine",
    name: "Gem mine",
    items: "Stone, Gem Fragments",
    getUnlocked: getUnlockedFactory("crafting", "farming", "brewing", "woodcutting", "cooking", "fishing", "melee"),
  },
};
