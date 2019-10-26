import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  recipeListSub: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeListSub = this.recipeService.recipesChanged.subscribe((recipesList: Recipe[]) => {
      this.recipes = recipesList;
    });
  }

  ngOnDestroy() {
    this.recipeListSub.unsubscribe();
  }
}
