import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqitemFormComponent } from './boqitem-form.component';

describe('BoqitemFormComponent', () => {
  let component: BoqitemFormComponent;
  let fixture: ComponentFixture<BoqitemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqitemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
