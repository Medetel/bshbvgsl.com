import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsGridComponent } from './agreements-grid.component';

describe('AgreementsGridComponent', () => {
  let component: AgreementsGridComponent;
  let fixture: ComponentFixture<AgreementsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
