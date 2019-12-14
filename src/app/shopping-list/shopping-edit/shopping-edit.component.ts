import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInput: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInput: ElementRef;
  @ViewChild('f', { static: false }) form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    // const name: string = this.nameInput.nativeElement.value;
    // const amount: number = Number.parseInt(this.amountInput.nativeElement.value);
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   ingredient
      // );
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    this.onClear();
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
