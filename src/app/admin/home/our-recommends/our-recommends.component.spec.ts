import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurRecommendsComponent } from './our-recommends.component';

describe('OurRecommendsComponent', () => {
  let component: OurRecommendsComponent;
  let fixture: ComponentFixture<OurRecommendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurRecommendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurRecommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
