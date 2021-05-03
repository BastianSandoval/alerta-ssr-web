import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditCaseComponent } from './form-edit-case.component';

describe('FormEditCaseComponent', () => {
  let component: FormEditCaseComponent;
  let fixture: ComponentFixture<FormEditCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
