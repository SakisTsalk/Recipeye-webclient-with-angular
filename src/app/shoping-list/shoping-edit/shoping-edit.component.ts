import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShopingListService} from '../shoping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShopingListService) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {

    const value = form.value;
   const newIngredient = new Ingredient(value.name, value.amount);
   if ( this.editMode) {
     this.slService.updateIngredient(this.editedItemIndex, newIngredient);
   } else {
     this.slService.addIngredient(newIngredient);
   }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.slService.deleteIngredient(this.editedItemIndex);
    }
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
