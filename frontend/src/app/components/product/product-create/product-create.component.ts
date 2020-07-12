import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.doPost(this.product, '/products').subscribe(() => {
      this.productService.showMessage("Product Created");
      this.router.navigate(['/products']);
    }, (error) => {
      this.productService.showMessage(error.message);
    })
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }
}
