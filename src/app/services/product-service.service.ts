import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/Product';
import { ProductI } from '../models/ProductI';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseUrl = 'http://localhost:8082/api/v1/products';
  private  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });
  constructor(private http: HttpClient) { }


  upload(product: Product): Observable<Product> {
    const formData: FormData = new FormData();

    formData.append('name', product.name);
    if(product.price != undefined ){
      formData.append('price', product.price.toPrecision());
    }
    if(product.stock != undefined ){
      formData.append('stock', product.stock.toFixed());
    }
      formData.append('file', product.image != undefined ?product.image : '');
    
    
    /*const req = new HttpRequest('POST', `${this.baseUrl}/upload`, product, {
      headers: this.headers,
      responseType: 'json'
    });*/
    console.log("form data",formData)
    return this.http.post<Product>(`${this.baseUrl}/save`,formData,{headers: this.headers} );
  }

  get():Observable<ProductI[]>{
    return this.http.get<ProductI[]>(`${this.baseUrl}/all`).pipe(
      map((products:ProductI[]) =>{
      return products.map(res =>({
        id:res.id,
        name:res.name,
        price:res.price,
        stock:res.stock,
        image:res.image!=null?'data:image/jpeg;base64,' + res.image:''
      }))
      }));
  }

  getImages():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }
}
