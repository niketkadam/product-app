import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = '/api/products/';
  postUrl = '/api/product/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseurl);
  }
  
  getProductById(id): Observable<any> {
    return this.http.get(`${this.baseurl}${id}`);
  }

  addProduct(product): Observable<any> {
    const body = JSON.stringify(product);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.postUrl, body, { 'headers': headers });
  }

  removeProduct(id): Observable<any> {
    return this.http.delete(this.postUrl + id);
  }
}
