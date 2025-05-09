import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferInFormComponent } from './transfer-in-form.component';

describe('TransferInFormComponent', () => {
  let component: TransferInFormComponent;
  let fixture: ComponentFixture<TransferInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
