import { Component, OnInit } from '@angular/core';

import{ Product } from '../../Product';
import { ProductService } from '../../product.service'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
