import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditInstitutionsComponent } from './form-edit-institutions.component';

describe('FormEditInstitutionsComponent', () => {
  let component: FormEditInstitutionsComponent;
  let fixture: ComponentFixture<FormEditInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
