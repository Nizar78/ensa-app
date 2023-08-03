import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

 public productForm!:FormGroup; // On va utiliser ce variable dans partie HTML ,pour cela on a mettre public

  constructor(private fb:FormBuilder, private productService:ProductService, private router:Router) {
  }

  ngOnInit() {
    // Maintenant on va definire la structure du formulaire

    // Toutes les donnees que je vais saisie dans le formulaire vont stocker dans cette object productForm
    this.productForm  = this.fb.group({
      name:this.fb.control("", [Validators.required]), // Valeur par defaut
      price:this.fb.control(0),// Valeur par defaut
      checked:this.fb.control(false)// Valeur par defaut
    })

  }
  saveProduct() {
      let product:Product =  this.productForm.value; // Recuperation de produit qu'on entrer dans la form

      this.productService.saveProduct(product).subscribe({
          next: value => this.router.navigateByUrl("/products")
      });
  }
}
