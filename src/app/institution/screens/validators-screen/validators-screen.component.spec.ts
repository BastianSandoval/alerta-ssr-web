import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsScreenComponent } from './validators-screen.component';

describe('ValidatorsScreenComponent', () => {
  let component: ValidatorsScreenComponent;
  let fixture: ComponentFixture<ValidatorsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
