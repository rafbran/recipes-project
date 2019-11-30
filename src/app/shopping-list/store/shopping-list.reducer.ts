import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [new Ingredient("Mele", 5), new Ingredient("Pomodori", 10)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    default:
      return state;
  }
}
