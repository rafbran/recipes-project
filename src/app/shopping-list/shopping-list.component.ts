import { Ingredient } from "./../shared/ingredient.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private changedSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.changedSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  ngOnDestroy() {
    // this.changedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
