import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorysScreenComponent } from './edit-categorys-screen.component';

describe('EditCategorysScreenComponent', () => {
  let component: EditCategorysScreenComponent;
  let fixture: ComponentFixture<EditCategorysScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategorysScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategorysScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
