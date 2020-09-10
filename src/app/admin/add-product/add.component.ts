import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  product: Product = new Product();
  url: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fbuiler: FormBuilder
  ) { }

  ngOnInit(): void {
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

  addProduct() {
    // console.log(this.form.value)
    this.product = this.form.value;
    this.product.img = this.url;
    this.productService.addProduct(this.product).subscribe(Data => {
      alert('Product has been added');
      this.router.navigateByUrl('/admin/list');
    })
    //console.log(this.product);
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

  form = this.fbuiler.group({
    // id: new FormControl(),
    name: [null, [
      Validators.required,

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
  checkInput(value) {
    for (let err in value.errors) {
      if (value.dirty) {
        return this.getErrorMes(err, value.errors[err]);
      }
    }
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

  
}
