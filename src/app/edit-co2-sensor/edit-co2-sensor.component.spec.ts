import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCo2SensorComponent } from './edit-co2-sensor.component';

describe('EditCo2SensorComponent', () => {
  let component: EditCo2SensorComponent;
  let fixture: ComponentFixture<EditCo2SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCo2SensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCo2SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
