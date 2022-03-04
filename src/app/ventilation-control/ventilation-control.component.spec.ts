import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentilationControlComponent } from './ventilation-control.component';

describe('VentilationControlComponent', () => {
  let component: VentilationControlComponent;
  let fixture: ComponentFixture<VentilationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentilationControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentilationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
