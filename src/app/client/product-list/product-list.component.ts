import { Component, OnInit } from '@angular/core';

import{ Product } from '../../Product';
import { ProductService } from '../../product.service'


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor( private productService: ProductService ) { 
   
  }

  ngOnInit() {
    this.getProducts();
  }

  products: Product[];
 

  getProducts(){
    this.productService.getProducts().subscribe(Data=>{ this.products=Data})
    // this.products= this.productService.getProducts();
    
  }

}
