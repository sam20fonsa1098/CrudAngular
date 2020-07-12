import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: null,
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.doGetById('/products', id).subscribe(resp => {
      this.product = resp
    }, error => {
      this.productService.showMessage(error.message)
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.doDelete('/products', id).subscribe(() => {
      this.productService.showMessage("Product Deleted");
      this.router.navigate(['/products']);
    }, (error) => {
      this.productService.showMessage(error.message);
    })
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }

}
