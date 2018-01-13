import {NgModule} from '@angular/core';
import {ShopingListComponent} from './shoping-list.component';
import {ShopingEditComponent} from './shoping-edit/shoping-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
 declarations: [
   ShopingListComponent,
   ShopingEditComponent
 ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ShoppingListModule {}
