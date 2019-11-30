import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'Carbonara',
  //     'Pasta con uova, guanciale, pecorino e pepe',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/30/Spaghetti_carbonara.jpg',
  //     [new Ingredient('Pasta', 2), new Ingredient('Guanciale', 2), new Ingredient('Uova', 4)]
  //   ),
  //   new Recipe(
  //     2,
  //     "Bucatini all'amatriciana",
  //     'Bucatini con pancetta e sugo',
  //     'https://upload.wikimedia.org/wikipedia/commons/9/9d/Bucatini_allamatriciana.jpg',
  //     [new Ingredient('Bucatini', 4), new Ingredient('Pancetta', 2), new Ingredient('Pomodoro', 4)]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find(x => x.id === id);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.shoppingListService.addIngredient(ingredient);
    // });
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    const indexToUpdate = this.recipes.findIndex(i => i.id === id);
    newRecipe.id = id;
    this.recipes[indexToUpdate] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const indexToDelete = this.recipes.findIndex(x => x.id === id);
    this.recipes.splice(indexToDelete, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
