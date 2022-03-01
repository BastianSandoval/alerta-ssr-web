import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionsScreenComponent } from './edit-institutions-screen.component';

describe('EditInstitutionsScreenComponent', () => {
  let component: EditInstitutionsScreenComponent;
  let fixture: ComponentFixture<EditInstitutionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstitutionsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
