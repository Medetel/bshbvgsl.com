import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpurchaseFormComponent } from './landpurchase-form.component';

describe('LandpurchaseFormComponent', () => {
  let component: LandpurchaseFormComponent;
  let fixture: ComponentFixture<LandpurchaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandpurchaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
