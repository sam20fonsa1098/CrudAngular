import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  updateProduct(): void {
    this.productService.doUpdate('/products', this.product.id.toString(), this.product).subscribe(() => {
      this.productService.showMessage("Product Updated");
      this.router.navigate(['/products']);
    }, (error) => {
      this.productService.showMessage(error.message);
    })
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }

}
