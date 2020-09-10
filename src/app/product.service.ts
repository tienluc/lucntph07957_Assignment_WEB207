import { Injectable } from '@angular/core';
import{ Product } from './Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api='https://5e79bf4517314d001613367f.mockapi.io/product';
  //products=Data;
  constructor(
    private http: HttpClient
  ) { }
 

 
  getProducts():  Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
    //return this.products;
  }
  getProduct(id):  Observable<Product>{
    console.log(id);
    return this.http.get<Product>(`${this.api}/${id}`);
    
  }
  addProduct(product): Observable<Product>{
    return this.http.post<Product>(`${this.api}`, product);
    // let newObj = { id: 6, ...product };
    // this.products.push(newObj);
  }
  updateProduct(product): Observable<Product>{
    return this.http.put<Product>(`${this.api}/${product.id}`,product);
  }
  removeProduct(id): Observable<Product>{
    return this.http.delete<Product>(`${this.api}/${id}`);
  }
}
