import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { CatalogueService } from '../service/catalogue.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
public currentProduct: Product;
public  mode = 1;
  constructor(private catService: CatalogueService, private router: Router) { } // Injection du router 

  ngOnInit() {
  }

  onSaveProduct(data: Product) {
    this.catService.saveProduct(this.catService.host + '/produits', data)
    .subscribe(res => {
      // this.router.navigateByUrl('/products'); //permet de rediriger vers products après création du produit
      this.currentProduct = res; // Pour utiliser "res", il faut lui indiquer que la méthode save retourne un Observable<Product>
      this.mode = 2;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  onNewProduct() {
    this.mode = 1;
  }
}
