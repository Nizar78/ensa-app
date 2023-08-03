import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http:HttpClient) { }

  getProducts(page:number=1,size:number=3):Observable<Array<Product>>{ // Observable<any> est le type de retour || Observable<Array<Product>> this mean that the ype of data that the observable has is of type array ..
   return  this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${page}`)
  }
  checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,{checked:!product.checked});
  }
  deleteProduct(product:Product) {
    return this.http.delete(`http://localhost:8089/products/${product.id}`);
  }
  saveProduct(product:Product) :Observable<Product> {
    return this.http.post<Product>("http://localhost:8089/products",product);
  }

  searchProducts(keyword:string):Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
    // C'est comme ça, on fait la recherche dans json serve, ?name= il faut specifier le champ
    //qu'on va utiliser dans la recherche, qui est dans notre cas le champ name

    //?name_like = keyword signifie les elements qui ont un champ name qui contient le mot keyword
  }
}
