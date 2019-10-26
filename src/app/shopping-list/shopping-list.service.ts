import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [new Ingredient('Mele', 5), new Ingredient('Pomodori', 10)];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    if (this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim())) {
      this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim()).amount +=
        ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    ingredients.forEach((ingredient: Ingredient) => {
      if (this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim())) {
        this.ingredients.find(x => x.name.toUpperCase().trim() === ingredient.name.toUpperCase().trim()).amount +=
          ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    });

    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
