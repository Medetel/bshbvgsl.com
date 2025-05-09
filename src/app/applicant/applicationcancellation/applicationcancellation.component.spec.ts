import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationcancellationComponent } from './applicationcancellation.component';

describe('ApplicationcancellationComponent', () => {
  let component: ApplicationcancellationComponent;
  let fixture: ComponentFixture<ApplicationcancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationcancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationcancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
