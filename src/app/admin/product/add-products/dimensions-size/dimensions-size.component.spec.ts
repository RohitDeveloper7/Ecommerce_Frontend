import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsSizeComponent } from './dimensions-size.component';

describe('DimensionsSizeComponent', () => {
  let component: DimensionsSizeComponent;
  let fixture: ComponentFixture<DimensionsSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionsSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionsSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
