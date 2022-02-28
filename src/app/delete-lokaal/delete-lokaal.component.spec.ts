import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLokaalComponent } from './delete-lokaal.component';

describe('DeleteLokaalComponent', () => {
  let component: DeleteLokaalComponent;
  let fixture: ComponentFixture<DeleteLokaalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLokaalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLokaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
