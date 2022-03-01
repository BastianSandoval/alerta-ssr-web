import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsScreenComponent } from './institutions-screen.component';

describe('InstitutionsScreenComponent', () => {
  let component: InstitutionsScreenComponent;
  let fixture: ComponentFixture<InstitutionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
