import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit, OnDestroy {

  private allSubscriptions: Subscription[] = [];
  dataSourceCategory!: Array <any>;

  constructor(private categoryService: CategoriesService){}


  ngOnInit(): void {
   this.categoryService.getCategory().then(allCategory =>{
    allCategory.subscribe(all =>{
      this.dataSourceCategory = all?all:[];
    });

   });
  }

  ngOnDestroy(): void {
    this.allSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
