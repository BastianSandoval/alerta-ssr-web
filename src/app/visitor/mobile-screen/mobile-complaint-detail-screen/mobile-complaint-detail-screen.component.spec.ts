import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileComplaintDetailScreenComponent } from './mobile-complaint-detail-screen.component';

describe('MobileComplaintDetailScreenComponent', () => {
  let component: MobileComplaintDetailScreenComponent;
  let fixture: ComponentFixture<MobileComplaintDetailScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileComplaintDetailScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileComplaintDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
