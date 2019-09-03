import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Mele', 5),
    new Ingredient('Pomodori', 10)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    console.log(ingredient);
    if (this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim())) {
      this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim()).amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    ingredients.forEach((ingredient: Ingredient) => {
      if (this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim())) {
        this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim()).amount += ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    });

    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
