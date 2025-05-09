import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdocGridComponent } from './registerdoc-grid.component';

describe('RegisterdocGridComponent', () => {
  let component: RegisterdocGridComponent;
  let fixture: ComponentFixture<RegisterdocGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterdocGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdocGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
