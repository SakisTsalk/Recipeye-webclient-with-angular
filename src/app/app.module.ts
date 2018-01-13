import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';


import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shoping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingListReducer} from './shoping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: ShoppingListReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
