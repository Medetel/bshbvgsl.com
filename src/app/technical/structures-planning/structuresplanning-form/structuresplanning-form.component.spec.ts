import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresplanningFormComponent } from './structuresplanning-form.component';

describe('StructuresplanningFormComponent', () => {
  let component: StructuresplanningFormComponent;
  let fixture: ComponentFixture<StructuresplanningFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresplanningFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresplanningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
