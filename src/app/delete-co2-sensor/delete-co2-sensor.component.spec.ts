import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCo2SensorComponent } from './delete-co2-sensor.component';

describe('DeleteCo2SensorComponent', () => {
  let component: DeleteCo2SensorComponent;
  let fixture: ComponentFixture<DeleteCo2SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCo2SensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCo2SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
