import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroundRentGridComponent } from './ground-rent-grid.component';


describe('GroundRentGridComponent', () => {
  let component: GroundRentGridComponent;
  let fixture: ComponentFixture<GroundRentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroundRentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundRentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
