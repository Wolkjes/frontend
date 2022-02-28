import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThresholdsComponent } from './change-thresholds.component';

describe('ChangeThresholdsComponent', () => {
  let component: ChangeThresholdsComponent;
  let fixture: ComponentFixture<ChangeThresholdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeThresholdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeThresholdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
