import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

//Un service est fait pour être injecter dans les composants
@Injectable({
  providedIn: 'root' //Nous évite d'avoir à le déclarer dans le module
})
export class CatalogueService {
  public host = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

    public getProducts(page: number, size: number) {
      return this.httpClient.get(this.host + '/produits?page=' + page + '&size=' + size);
    }
    public getProductsByKeyword(mc: string, page: number, size: number) {
      return this.httpClient.get(this.host + '/produits/search/byDesignationPage?mc=' + mc + '&page=' + page + '&size=' + size);
    }

    public deleteResource(url: string) {//Méthode générique pour tout objet (produit...)
      return this.httpClient.delete(url);
    }
    public deleteResourceById(url: string) {
      return this.httpClient.delete(this.host + '/produits/deleteById?id=' + url);

    }
    public deleteProduct(id: number){
      return this.httpClient.delete(this.host + '/produits/' + id);
    }
    public saveResource(url: string, data: any) {
      return this.httpClient.post(url, data);
    }
    public saveProduct(url: string, data: Product): Observable<Product> {
      return this.httpClient.post<Product>(url, data);
    }
    public getRessource(url: string): Observable<any> {
      return this.httpClient.get(url);
    }
    public updateRessource(url: string, data: Product): Observable<Product> {
      return this.httpClient.put<Product>(url, data);
    }
  }

