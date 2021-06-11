import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopHomeScreenComponent } from './desktop-home-screen.component';

describe('DesktopHomeScreenComponent', () => {
  let component: DesktopHomeScreenComponent;
  let fixture: ComponentFixture<DesktopHomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopHomeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
