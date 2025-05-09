import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtiOnlineComponent } from './rtionline.component';

describe('RtiOnlineComponent ', () => {
  let component: RtiOnlineComponent ;
  let fixture: ComponentFixture<RtiOnlineComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtiOnlineComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtiOnlineComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
