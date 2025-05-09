import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantCommercialPropertyComponent } from './vacant-commercial-property.component';

describe('VacantCommercialPropertyComponent', () => {
  let component: VacantCommercialPropertyComponent;
  let fixture: ComponentFixture<VacantCommercialPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantCommercialPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantCommercialPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
