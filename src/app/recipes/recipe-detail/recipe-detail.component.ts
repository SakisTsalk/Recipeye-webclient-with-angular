import {Component, Input, OnInit} from '@angular/core';

import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private  route: ActivatedRoute, private router: Router,private authService: AuthService) { }

  ngOnInit() {
  this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.recipe = this.recipeService.getRecipe(this.id);
  });
    }

  onAddToshoppingList() {
    if (this.authService.isAuthenticated()) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onEditRecipe() {
    if (this.authService.isAuthenticated()) {
    this.router.navigate(['edit'], {relativeTo: this.route});
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onDeleteRecipe() {
    if (this.authService.isAuthenticated()) {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/signin']);
    }
}

}
