import { Component, OnInit, OnDestroy } from '@angular/core';

import {  Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode = true;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive: boolean;
  products$: Observable<Product[]>;
  // sub: Subscription;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => (this.selectedProduct = currentProduct)
    );

    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // .subscribe( (products: Product[] ) => this.products = products );

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
    });

    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      selectedProduct => {
        this.selectedProduct = selectedProduct;
    });

    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);

    this.store.dispatch(new productActions.SetCurrentProduct(product));  }
}
