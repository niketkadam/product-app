import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  productDetails: any;
  loading = false;

  constructor(private route: ActivatedRoute, private prodSvc: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loading = true;
      this.prodSvc.getProductById(id).subscribe(res => {
        this.productDetails = res;
        this.loading = false;
        console.log(this.productDetails);
      })
    }
    )
  }
}
