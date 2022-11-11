import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StarsComponent } from './stars.component';

export class StarsPageObject {
  constructor(private _fixture: ComponentFixture<StarsComponent>) {
  }

  successStars(): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(`[data-selector="stars-success"]`));
  }

  grayStars(): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(`[data-selector="stars-gray"]`))
  }

  getRate(): string {
    return this._getText(
      this._fixture.debugElement.query(By.css(`[data-selector="rate"]`))
    );
  }

  private _getText(element?: DebugElement): string {
    return element && element.properties['innerText'] || '';
  }
}
