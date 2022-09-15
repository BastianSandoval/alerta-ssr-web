import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionInfoScreenComponent } from './institution-info-screen.component';

describe('InstitutionInfoScreenComponent', () => {
  let component: InstitutionInfoScreenComponent;
  let fixture: ComponentFixture<InstitutionInfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionInfoScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
