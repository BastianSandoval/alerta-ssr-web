import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddDogComponent } from './form-add-dog.component';

describe('FormAddDogComponent', () => {
  let component: FormAddDogComponent;
  let fixture: ComponentFixture<FormAddDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddDogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
