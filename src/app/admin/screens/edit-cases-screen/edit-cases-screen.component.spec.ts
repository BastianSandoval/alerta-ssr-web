import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCasesScreenComponent } from './edit-cases-screen.component';

describe('EditCasesScreenComponent', () => {
  let component: EditCasesScreenComponent;
  let fixture: ComponentFixture<EditCasesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCasesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCasesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
