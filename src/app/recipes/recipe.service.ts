import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShopingListService} from '../shoping-list/shoping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super tasty Schnitzel',
      'http://www.dvo.com/link/0630_155947172.jpg',
      [new Ingredient('Meat', 1),
        new Ingredient('french fries', 20)]),
    new Recipe('Mousaka',
      'Greek traditional food',
      'http://media2.sailusfood.com/wp-content/uploads/2016/02/cheese-corn-balls-recipe.jpg',
      [new Ingredient('Meat', 1),
      new Ingredient('Becamel', 1),
      new Ingredient('Pasta', 1)])
  ];

  constructor(private slService: ShopingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {

    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
