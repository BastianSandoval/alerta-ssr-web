import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditDogComponent } from './form-edit-dog.component';

describe('FormEditDogComponent', () => {
  let component: FormEditDogComponent;
  let fixture: ComponentFixture<FormEditDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditDogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
