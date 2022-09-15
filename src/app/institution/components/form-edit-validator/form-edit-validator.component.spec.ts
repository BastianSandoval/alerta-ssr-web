import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditValidatorComponent } from './form-edit-validator.component';

describe('FormEditValidatorComponent', () => {
  let component: FormEditValidatorComponent;
  let fixture: ComponentFixture<FormEditValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
