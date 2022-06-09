import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSettingsComponent } from './product-details-settings.component';

describe('ProductDetailsSettingsComponent', () => {
  let component: ProductDetailsSettingsComponent;
  let fixture: ComponentFixture<ProductDetailsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
