import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(1, 'Carbonara',
    'Pasta con uova, guanciale, pecorino e pepe',
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Spaghetti_carbonara.jpg',
     [
       new Ingredient('Pasta', 2),
       new Ingredient('Guanciale', 2),
       new Ingredient('Uova', 4)
      ]),
    new Recipe(2, 'Bucatini all\'amatriciana',
    'Bucatini con pancetta e sugo',
    'https://upload.wikimedia.org/wikipedia/commons/9/9d/Bucatini_allamatriciana.jpg',
    [
      new Ingredient('Bucatini', 4),
      new Ingredient('Pancetta', 2),
      new Ingredient('Pomodoro', 4)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find(x => x.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.shoppingListService.addIngredient(ingredient);
    // });
    this.shoppingListService.addIngredients(ingredients);
  }
}
