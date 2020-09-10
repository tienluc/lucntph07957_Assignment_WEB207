import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Product';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  url: string;
  constructor(

    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fbuiler: FormBuilder


  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.route.params.subscribe(param => {
      this.productService.getProduct(param.productID).subscribe(Data => {
        this.product = Data;
      })
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = <string>event.target.result;
      }
    }
  }
  back() {
    if (confirm("Do you want to exit without changing the data?") == true) {
      this.router.navigateByUrl('/admin');
    }
  }
  clear() {
    var ten = <HTMLInputElement>document.getElementById("name");
    ten.value = null;

    var anh = <HTMLInputElement>document.getElementById("img");
    anh.value = null;

    var gia = <HTMLInputElement>document.getElementById("price");
    gia.value = null;

    var ST = <HTMLInputElement>document.getElementById("status");
    ST.value = null;
  }

  updateProduct() {
    // console.log(this.product);
    this.product.img = this.url;
    this.productService.updateProduct(this.product).subscribe(Data => {
      // console.log(Data);
      alert('Product information has been updated');
      this.router.navigateByUrl('/admin/list');
    })
  }

  form = this.fbuiler.group({
    // id: new FormControl(),
    name: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(50),
      Validators.minLength(1),
      Validators.pattern("^[^ \s]+|[^\s ]+$")

    ]],
    price: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(20),
      Validators.minLength(1),
      Validators.pattern('[0-9]*')
    ]],
    status: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(10000),
      Validators.minLength(1),
      Validators.pattern("^[^ \s]+|[^\s ]+$")

    ]],
    img: [null, [
      Validators.required,

    ]],
  });
  getErrorMes(err, value) {
    let messages = {
      'required': 'Do not leave this field blank',
      'maxlength': `Maximum of  ${value.requiredLength} characters`,
      'minlength': `Minimum of ${value.requiredLength} characters`,
      'pattern': 'wrong format',
    };
    return messages[err];
  }

  get productName() {
    return this.checkInput(this.form.controls.name);
  }

  get productPrice() {
    return this.checkInput(this.form.controls.price);
  }

  get ProductStatus() {
    return this.checkInput(this.form.controls.status);
  }

  get ProductImage() {
    return this.checkInput(this.form.controls.img);
  }

  checkInput(value) {
    for (let err in value.errors) {
      if (value.dirty) {
        return this.getErrorMes(err, value.errors[err]);
      }
    }
  }

}
