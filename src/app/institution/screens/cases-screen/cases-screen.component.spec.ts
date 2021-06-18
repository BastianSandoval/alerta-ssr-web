import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesScreenComponent } from './cases-screen.component';

describe('CasesScreenComponent', () => {
  let component: CasesScreenComponent;
  let fixture: ComponentFixture<CasesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
