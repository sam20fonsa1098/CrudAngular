import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.doGet('/products').subscribe((resp) => {
      this.products = resp;
      console.log(this.products)
    }, error => {
      this.productService.showMessage(error.message);
    })
  }

}
