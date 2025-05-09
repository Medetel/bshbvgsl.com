import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyViewComponent } from './scrutiny-view.component';

describe('ScrutinyViewComponent', () => {
  let component: ScrutinyViewComponent;
  let fixture: ComponentFixture<ScrutinyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrutinyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
