import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  products = [];
  constructor(private router: Router, private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
    })
  }

  addProduct(): void {
    this.router.navigate(['/add-products']);
  }
  remove(product): void {
    this.productSvc.removeProduct(product._id).subscribe(res => {
      console.log(res);
      const updatedProduct = this.products;
      this.products = updatedProduct.filter(prod => prod._id !== product._id);
    });
  }

}
