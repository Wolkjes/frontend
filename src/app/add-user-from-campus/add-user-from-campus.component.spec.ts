import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFromCampusComponent } from './add-user-from-campus.component';

describe('AddUserFromCampusComponent', () => {
  let component: AddUserFromCampusComponent;
  let fixture: ComponentFixture<AddUserFromCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserFromCampusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserFromCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
