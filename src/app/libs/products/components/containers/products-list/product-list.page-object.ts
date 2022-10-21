import { ComponentFixture } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class ProductListPage {
  constructor(private _fixture: ComponentFixture<ProductsComponent>) {
  }

  getProductWrapper(): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(`[data-selector="product-container"]`));
  }

  titleFor(productId: string): string {
    return this._getText(
      this._fixture.debugElement.query(By.css(`[data-selector="product-title-${productId}"]`))
    );
  }

  descriptionFor(productId: string): string {
    return this._getText(this._fixture.debugElement.query(By.css(`[data-selector="product-description-${productId}"]`)));
  }

  priceFor(productId: string): string {
    return this._getText(this._fixture.debugElement.query(By.css(`[data-selector="product-price-${productId}"]`)));
  }

  allReviewsFor(productId: string): string {
    return this._getText(this._fixture.debugElement.query(By.css(`[data-selector="product-all-reviews-${productId}"]`)));
  }

  cartButtonFor(productId: string): string {
    return this._getText(this._fixture.debugElement.query(By.css(`[data-selector="product-add-to-cart-button-${productId}"]`)));
  }

  imageFor(productId: string): string {
    const imageElement = this._fixture.debugElement.query(By.css(`[data-selector="product-image-${productId}"]`));
    return imageElement && imageElement.properties['src'] || '';
  }

  ratingFor(productId: string): string {
    return this._getText(this._fixture.debugElement.query(By.css(`[data-selector="product-rating-${productId}"]`)));
  }

  hasDetailsButtonFor(productId: string): boolean {
    const button = this._fixture.debugElement.query(By.css(`[data-selector="product-details-button-${productId}"]`));
    return Boolean(button);
  }

  private _getText(element?: DebugElement): string {
    return element && element.properties['innerText'] || '';
  }
}
