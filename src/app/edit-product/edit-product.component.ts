import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CatalogueService } from '../service/catalogue.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public currentProduct: Product;
  public url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private catService: CatalogueService) { } 
  // ActivatedRoute=> permet d'aller chercher l'info de l'id dans la route "empruntée"

  ngOnInit() {
    this.url = atob(this.activatedRoute.snapshot.params.id);
  //  console.log(this.activatedRoute.snapshot.params.id);
    this.catService.getRessource(this.url)
  .subscribe(data => {
    this.currentProduct = data;
     }, err => {
    console.log(err);
  });
  }
  onUpdateProduct(data: Product) {
    this.catService.updateRessource(this.catService.host + '/produits', data)
    .subscribe(res => {
     alert('Mise à jour effectuée !');
     this.router.navigateByUrl('/products');
    }, err => {
      console.log(err);
    });
  }
}
