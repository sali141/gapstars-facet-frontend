import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';
import { Category } from './interfaces/category.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    categories: any[];
    selectedCategories: any[];
    isLoading: boolean;

    constructor(
        private categoriesService: CategoriesService

    ) { }

    ngOnInit(): void {
      this.getCategories();
    }

    getCategories(){
      this.isLoading = true;
      // fetch categories from the API.
      // const apiUrl = 'assets/cats.json';
      const apiUrl = `${environment.api}categories`;

      this.categoriesService.getCategories(apiUrl)
          .subscribe((resp: any) => {
            // initially setting all checkboxes non selected
            const apiResponse = resp.map(obj => {
                obj.isSelected = false;
                return obj;
            });

            this.categories = this.generateTreeStructure(apiResponse);
            this.isLoading = false; // hide the loading
          },
          (error: any) => {
            console.log(error);
          }
        );
    }

    // generate array in tree structure to bind and maintain data easily
    generateTreeStructure(response) {
        const indexed = response.reduce((res, item) => {
            res[item.id] = item;
            return res;
        }, {});

        // retain the root items only
        const result = response.filter((item) => {
            // get parent
            const parent = indexed[item.parent];
            // has parent?
            if (parent) {
                // add item as a child
                parent.collapsed = true;
                parent.children = (parent.children || []).concat(item);
            }
            // This part determines if the item is a root item or not
            return !parent;
        });
        return (result);
    }

    toggleSelect(event) {
        this.selectedCategories = [];
        this.updateSelectedCategories(this.categories);
    }

    updateSelectedCategories(categories) {
        categories.forEach(obj => {
            if (obj.isSelected) {
                this.selectedCategories.push({id : obj.id , name : obj.name});
            }

            if (obj.children && obj.children.length > 0) {
                this.updateSelectedCategories(obj.children);
            }
        });
    }

    removeAllSelected(categories) {
        categories.forEach(obj => {
            obj.isSelected = false;
            obj.selectAll = false;
            if (obj.children && obj.children.length > 0) {
                this.removeAllSelected(obj.children);
            }
        });
        this.selectedCategories = [];
    }
}
