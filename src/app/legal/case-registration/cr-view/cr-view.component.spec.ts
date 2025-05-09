import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrViewComponent } from './cr-view.component';

describe('CrViewComponent', () => {
  let component: CrViewComponent;
  let fixture: ComponentFixture<CrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
