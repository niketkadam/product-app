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
  loading = false;
  constructor(private router: Router, private productSvc: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productSvc.getProducts().subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }

  addProduct(): void {
    this.router.navigate(['/add-products']);
  }

  remove(product): void {
    this.productSvc.removeProduct(product._id).subscribe(res => {
      this.products = this.products.filter(prod => prod._id !== product._id);
    });
    event.stopPropagation();
  }

  routeTo(product): void {
    this.router.navigate(['/product', product._id]);
  }

}
