import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipes.actions';
import { StartEdit } from 'src/app/shopping-list/store/shopping-list.actions';
export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      const newRecipe = action.payload;
      newRecipe.id = state.recipes.length + 1;
      return {
        ...state,
        recipes: [...state.recipes, newRecipe]
      };
    case RecipesActions.UPDATE_RECIPE:
      const indexToUpdate = state.recipes.findIndex(
        i => i.id === action.payload.idToUpdate
      );

      const updatedRecipe = {
        ...state.recipes[indexToUpdate],
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[indexToUpdate] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return recipe.id !== action.payload;
        })
      };
    default:
      return state;
  }
}
