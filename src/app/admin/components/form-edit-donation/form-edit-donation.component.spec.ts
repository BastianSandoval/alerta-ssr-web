import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditDonationComponent } from './form-edit-donation.component';

describe('FormEditDonationComponent', () => {
  let component: FormEditDonationComponent;
  let fixture: ComponentFixture<FormEditDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
