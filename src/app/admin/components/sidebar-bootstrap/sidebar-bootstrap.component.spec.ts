import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBootstrapComponent } from './sidebar-bootstrap.component';

describe('SidebarBootstrapComponent', () => {
  let component: SidebarBootstrapComponent;
  let fixture: ComponentFixture<SidebarBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBootstrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
