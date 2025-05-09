import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalGridComponent } from './proposal-grid.component';

describe('ProposalGridComponent', () => {
  let component: ProposalGridComponent;
  let fixture: ComponentFixture<ProposalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
