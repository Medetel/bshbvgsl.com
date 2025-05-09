import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCreditBulkFormComponent } from './leave-credit-bulk-form.component';

describe('LeaveCreditBulkFormComponent', () => {
  let component: LeaveCreditBulkFormComponent;
  let fixture: ComponentFixture<LeaveCreditBulkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCreditBulkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCreditBulkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
