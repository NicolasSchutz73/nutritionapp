import { Component } from '@angular/core';
import { DailySummaryComponent } from '../daily-summary/daily-summary.component';
import { MealListComponent } from '../meal-list/meal-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DailySummaryComponent, MealListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
