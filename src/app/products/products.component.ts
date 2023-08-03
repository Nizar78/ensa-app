import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

/*  products : Array<any> = [
    {id:1, name:"Computer", price:4500, checked:false},
    {id:2, name:"Printer", price:1200, checked:true},
    {id:3, name:"Phone", price:3200, checked:false},
  ];*/
  public products! : Array<Product>;
  public keyword:string="";
  //products! : Observable<Array<Product>>
  constructor(private productService:ProductService) {}
  ngOnInit(){
   this.getProducts();
  }
  getProducts(){
    this.productService.getProducts().subscribe({
        next : data => this.products = data,
        error : err => {
          console.log(err);
        }
      }
    );

    //this.products = this.productService.getProducts();
  }
  /*handleCheckProduct(product:any){
    product.checked = !product.checked;
  }
  On va maintenant changer la valeur de checked mais au niveau backend
  */

  handleCheckProduct(product:any){
    this.productService.checkProduct(product)
      .subscribe({
        next: updatedProduct => { /* Il va retourner l'objet product qui a ete modifier */
          product.checked = !product.checked; /* On a ajouter ce ligne pour modier la valuer checked au niveau front
           et pour le modifer au niveau back on a envoyer une requete de type patch.

           Si on ne fait pas ce ligne product.check.... , il faut actualiser la pgae -> c'est on va reenvoyer method get
           ce qui va recharger toutes les donnes , pour eviter tous ça on peut juste utiliser cette ligne product.checked = !product.checked;
           */
        }
      })
  }

  handleDeleteProduct(product:Product) {
        if(confirm("Etes vous sure?"))
        this.productService.deleteProduct(product).subscribe({
          next : data => {
            // On doit maintenant supprimer la ligne dans la partie front
            //this.getProducts(); On peut faire ça , mais on peut faire mieux que ça

            this.products = this.products.filter(item => item.id != product.id);
          }
        });
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : products => {
        this.products = products;
      }, error :err => {
        console.log(err);
      }
    });
  }
}
