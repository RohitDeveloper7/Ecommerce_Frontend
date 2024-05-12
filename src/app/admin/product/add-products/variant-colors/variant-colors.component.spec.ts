import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantColorsComponent } from './variant-colors.component';

describe('VariantColorsComponent', () => {
  let component: VariantColorsComponent;
  let fixture: ComponentFixture<VariantColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
