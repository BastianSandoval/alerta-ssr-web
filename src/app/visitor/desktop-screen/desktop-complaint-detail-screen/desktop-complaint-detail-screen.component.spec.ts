import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopComplaintDetailScreenComponent } from './desktop-complaint-detail-screen.component';

describe('DesktopComplaintDetailScreenComponent', () => {
  let component: DesktopComplaintDetailScreenComponent;
  let fixture: ComponentFixture<DesktopComplaintDetailScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopComplaintDetailScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopComplaintDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
