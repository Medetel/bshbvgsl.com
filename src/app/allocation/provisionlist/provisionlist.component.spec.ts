import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionlistComponent } from './provisionlist.component';

describe('ProvisionlistComponent', () => {
  let component: ProvisionlistComponent;
  let fixture: ComponentFixture<ProvisionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
