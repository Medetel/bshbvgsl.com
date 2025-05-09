import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandrecordformComponent } from './landrecordform.component';

describe('LandrecordformComponent', () => {
  let component: LandrecordformComponent;
  let fixture: ComponentFixture<LandrecordformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandrecordformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandrecordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
