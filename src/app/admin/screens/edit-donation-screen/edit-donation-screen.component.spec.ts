import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonationScreenComponent } from './edit-donation-screen.component';

describe('EditDonationScreenComponent', () => {
  let component: EditDonationScreenComponent;
  let fixture: ComponentFixture<EditDonationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDonationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
