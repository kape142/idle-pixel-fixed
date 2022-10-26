import React from "react";
import LabeledIPimg from "../../util/LabeledIPimg";
import { BrewingIngredient } from "./useBrewingIngredientsObserver";
import { Ingredient } from "./potions";

interface Props {
  potion: string;
  amount: number;
  maxAmount: number;
  ingredients: Ingredient[];
  brewingIngredients: Record<string, BrewingIngredient>;
  brewingLevel: number;
  level: number;
}

const BrewingTooltip = ({
  potion,
  amount,
  maxAmount,
  ingredients,
  brewingIngredients,
  level,
  brewingLevel,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
        alignItems: "center",
      }}
    >
      {amount > 0 ? (
        <div>
          Brew {amount} {Items.get_pretty_item_name(potion)} (max {maxAmount})
        </div>
      ) : (
        <div>Can't Brew {Items.get_pretty_item_name(potion)}</div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          minWidth: "400px",
        }}
      >
        {ingredients.map((ingredient) => (
          <LabeledIPimg
            name={ingredient.item}
            size={30}
            style={{
              color:
                ingredient.amount <= brewingIngredients[ingredient.item].value
                  ? undefined
                  : "red",
            }}
            label={`${Math.max(amount, 1) * ingredient.amount}/${
              brewingIngredients[ingredient.item].value
            }`}
          />
        ))}
      </div>
      {level > brewingLevel ? (
        <div style={{ color: "red" }}>
          Required brewing level {brewingLevel}/{level}
        </div>
      ) : null}
    </div>
  );
};

export default BrewingTooltip;
