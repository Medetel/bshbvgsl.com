import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixoneimportlandprocComponent } from './sixoneimportlandproc.component';

describe('SixoneimportlandprocComponent', () => {
  let component: SixoneimportlandprocComponent;
  let fixture: ComponentFixture<SixoneimportlandprocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixoneimportlandprocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixoneimportlandprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
