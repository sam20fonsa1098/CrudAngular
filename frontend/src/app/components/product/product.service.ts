import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,  
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Something went wrong!", true)
    return EMPTY
  }

  doPost(product: Product, url: string): Observable<Product> {
    return this.http.post<Product>(environment.baseUrl + url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  doGet(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + url)
  }

  doGetById(url: string, id: string): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + url + '/' + id)
  }

  doUpdate(url: string, id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(environment.baseUrl + url + '/' + id, product)
  }

  doDelete(url: string, id: string): Observable<Product> {
    return this.http.delete<Product>(environment.baseUrl + url + '/' + id)
  }

}
