import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatDetailComponent } from './subcat-detail.component';

describe('SubcatDetailComponent', () => {
  let component: SubcatDetailComponent;
  let fixture: ComponentFixture<SubcatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
