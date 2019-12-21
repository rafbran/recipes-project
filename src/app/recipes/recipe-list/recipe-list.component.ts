import { RecipeService } from './../recipe.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  recipeListSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.recipeListSub = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipesList: Recipe[]) => {
        this.recipes = recipesList;
      });
  }

  ngOnDestroy() {
    this.recipeListSub.unsubscribe();
  }
}
