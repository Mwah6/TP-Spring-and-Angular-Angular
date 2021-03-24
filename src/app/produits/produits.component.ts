import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogueService } from '../service/catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
public produits: any;
public size = 5;
public currentPage = 0;
public totalPages: number;
public pages: Array<number>;
public currentKeyword = '';
  constructor(private catService: CatalogueService, private router: Router) {//Injection du service
  }

  ngOnInit() {

  }
  onGetProducts() {
this.catService.getProducts(this.currentPage, this.size)
.subscribe(data => {
  //this.totalPages = data.page.totalPages; // Marche mais problème synthaxique
  this.totalPages = data['page'].totalPages;//C'est u objet Json. On le parcour sous forme de clé
  this.pages = new Array<number>(this.totalPages);
  this.produits = data;
}, err => {
  console.log(err);
}
  );
}
onPageProduct(i) {
  this.currentPage = i;
  this.chercherProduits();
}
onChercher(form: any) {
  this.currentPage = 0;
  this.currentKeyword = form.keyword;
  this.chercherProduits();
}
chercherProduits() {
  this.catService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size) // value.keyword vient du formulaire
  .subscribe(data => {
    // this.totalPages = data.page.totalPages; // Marche mais problème synthaxique
    this.totalPages = data['page'].totalPages;
    this.pages = new Array<number>(this.totalPages);
    this.produits = data;
  }, err => {
    console.log(err);
  }
    );
}
onDeleteProduct(produit: any) {
  const conf = confirm('Etes-vous sûr ?');
  if (conf) {
    this.catService.deleteResource(produit._links.self.href)
    .subscribe(data => {
      this.chercherProduits(); // MAJ de la page affichée après suppression
    }, err => {
      console.log(err);
    });

  }
}
onEditProduct(p: any) {
// this.router.navigateByUrl('/edit-product/' + p.id);
const url: string = p._links.self.href;
this.router.navigateByUrl('/edit-product/' + btoa(url));

}
}
