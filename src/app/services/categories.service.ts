import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(
        private http: HttpClient,
    ) { }

    getCategories(apiUrl): Observable<Category> {
        return this.http.get<Category>(apiUrl).pipe(map(res => res));
    }

}
