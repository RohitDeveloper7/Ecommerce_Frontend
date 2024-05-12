import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshDealsComponent } from './fresh-deals.component';

describe('FreshDealsComponent', () => {
  let component: FreshDealsComponent;
  let fixture: ComponentFixture<FreshDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreshDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreshDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
