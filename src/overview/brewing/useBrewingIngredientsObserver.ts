import { useNumberItemObserver } from "../setItems/useSetItemsObserver";

export interface BrewingIngredient {
  value: number;
  setValue: (newValue: number) => void;
}

export const useBrewingIngredientsObserver = (
  id: string
): Record<string, BrewingIngredient> => {
  const hookId = `useBrewingIngredientsObserver-${id}`;
  const [dottedGreenLeaf, setDottedGreenLeaf] = useNumberItemObserver(
    `dotted_green_leaf`,
    hookId
  );
  const [redMushroom, setRedMushroom] = useNumberItemObserver(
    `red_mushroom`,
    hookId
  );
  const [greenLeaf, setGreenLeaf] = useNumberItemObserver(`green_leaf`, hookId);
  const [limeLeaf, setLimeLeaf] = useNumberItemObserver(`lime_leaf`, hookId);
  const [strangeLeaf, setStrangeLeaf] = useNumberItemObserver(
    `strange_leaf`,
    hookId
  );
  const [goldLeaf, setGoldLeaf] = useNumberItemObserver(`gold_leaf`, hookId);
  const [bones, setBones] = useNumberItemObserver(`bones`, hookId);
  const [promethium, setPromethium] = useNumberItemObserver(
    `promethium`,
    hookId
  );
  const [rocketFuel, setRocketFuel] = useNumberItemObserver(
    `rocket_fuel`,
    hookId
  );
  const [moonstone, setMoonstone] = useNumberItemObserver(`moonstone`, hookId);
  const [titanium, setTitanium] = useNumberItemObserver(`titanium`, hookId);

  return {
    dotted_green_leaf: {
      value: dottedGreenLeaf,
      setValue: setDottedGreenLeaf,
    },
    red_mushroom: {
      value: redMushroom,
      setValue: setRedMushroom,
    },
    green_leaf: {
      value: greenLeaf,
      setValue: setGreenLeaf,
    },
    lime_leaf: {
      value: limeLeaf,
      setValue: setLimeLeaf,
    },
    strange_leaf: {
      value: strangeLeaf,
      setValue: setStrangeLeaf,
    },
    gold_leaf: {
      value: goldLeaf,
      setValue: setGoldLeaf,
    },
    bones: {
      value: bones,
      setValue: setBones,
    },
    promethium: {
      value: promethium,
      setValue: setPromethium,
    },
    rocket_fuel: {
      value: rocketFuel,
      setValue: setRocketFuel,
    },
    moonstone: {
      value: moonstone,
      setValue: setMoonstone,
    },
    titanium: {
      value: titanium,
      setValue: setTitanium,
    },
  };
};
