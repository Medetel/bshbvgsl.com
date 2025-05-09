import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaBillFormComponent } from './ra-bill-form.component';

describe('RaBillFormComponent', () => {
  let component: RaBillFormComponent;
  let fixture: ComponentFixture<RaBillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaBillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
