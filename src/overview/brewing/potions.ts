import { reduceToRecord } from "../../util/arrayUtils";

export interface Ingredient {
  item: string;
  amount: number;
}

interface PotionData {
  level: number;
  getTime: () => number;
  ingredients: Ingredient[];
}

const getData = (potionName: string) => ({
  getTime: () => Brewing.get_potion_timer(potionName),
  ingredients: reduceToRecord<Ingredient>(Brewing.get_ingredients(potionName), [
    (value) => ({ item: value }),
    (value) => ({ amount: Number(value) }),
  ]),
});



export const POTIONS: Record<string, PotionData> = {
  stardust_potion: {
    level: 1,
    ...getData("stardust_potion")
  },
  energy_potion: {
    level: 3,
    ...getData("energy_potion")
  },
  anti_disease_potion: {
    level: 5,
    ...getData("anti_disease_potion")
  },
  tree_speed_potion: {
    level: 8,
    ...getData("tree_speed_potion")
  },
  smelting_upgrade_potion: {
    level: 10,
    ...getData("smelting_upgrade_potion")
  },
  great_stardust_potion: {
    level: 13,
    ...getData("great_stardust_potion")
  },
  farming_speed_potion: {
    level: 15,
    ...getData("farming_speed_potion")
  },
  rare_monster_potion: {
    level: 20,
    ...getData("rare_monster_potion")
  },
  super_stardust_potion: {
    level: 25,
    ...getData("super_stardust_potion")
  },
  gathering_unique_potion: {
    level: 27,
    ...getData("gathering_unique_potion")
  },
  heat_potion: {
    level: 30,
    ...getData("heat_potion")
  },
  bone_potion: {
    level: 35,
    ...getData("bone_potion")
  },
  promethium_potion: {
    level: 40,
    ...getData("promethium_potion")
  },
  super_rare_monster_potion: {
    level: 45,
    ...getData("super_rare_monster_potion")
  },
  ultra_stardust_potion: {
    level: 50,
    ...getData("ultra_stardust_potion")
  },
  rocket_potion: {
    level: 55,
    ...getData("rocket_potion")
  },
  titanium_potion: {
    level: 60,
    ...getData("titanium_potion")
  },
};
