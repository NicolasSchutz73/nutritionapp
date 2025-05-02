import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { FoodsComponent } from './foods/foods.component';
import { MealsComponent } from './meals/meals.component';
import { GoalsComponent } from './goals/goals.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'goals', component: GoalsComponent },
  // autres routes...
];