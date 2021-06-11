import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHomeScreenComponent } from './mobile-home-screen.component';

describe('MobileHomeScreenComponent', () => {
  let component: MobileHomeScreenComponent;
  let fixture: ComponentFixture<MobileHomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileHomeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
