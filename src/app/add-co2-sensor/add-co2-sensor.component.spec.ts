import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCo2SensorComponent } from './add-co2-sensor.component';

describe('AddCo2SensorComponent', () => {
  let component: AddCo2SensorComponent;
  let fixture: ComponentFixture<AddCo2SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCo2SensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCo2SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
