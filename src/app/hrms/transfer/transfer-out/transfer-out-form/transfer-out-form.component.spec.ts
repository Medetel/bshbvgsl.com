import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOutFormComponent } from './transfer-out-form.component';

describe('TransferOutFormComponent', () => {
  let component: TransferOutFormComponent;
  let fixture: ComponentFixture<TransferOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferOutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
