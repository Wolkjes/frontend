import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCampusComponent } from './delete-campus.component';

describe('DeleteCampusComponent', () => {
  let component: DeleteCampusComponent;
  let fixture: ComponentFixture<DeleteCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCampusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
