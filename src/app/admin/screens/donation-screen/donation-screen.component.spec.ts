import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationScreenComponent } from './donation-screen.component';

describe('DonationScreenComponent', () => {
  let component: DonationScreenComponent;
  let fixture: ComponentFixture<DonationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
