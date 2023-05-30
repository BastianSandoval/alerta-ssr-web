import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditTendersComponent } from './form-edit-tenders.component';

describe('FormEditTendersComponent', () => {
  let component: FormEditTendersComponent;
  let fixture: ComponentFixture<FormEditTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditTendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
