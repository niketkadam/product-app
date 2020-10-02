import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  fileToUpload: any;
  imageUrl: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private prodSvc: ProductService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    }
    );
  }

  get productFormControl() {
    return this.productForm.controls;
  }

  handleFileInput(event) {
    // this.fileToUpload = file.item(0);
    // let reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.imageUrl = event.target.result;
    // }
    // reader.readAsDataURL(this.fileToUpload);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.productForm.patchValue({
          image: reader.result
        });
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      this.prodSvc.addProduct(this.productForm.value).subscribe(res=>{
        console.log(res);
      })
      this.router.navigate(['/products']);
    }
  }
}
