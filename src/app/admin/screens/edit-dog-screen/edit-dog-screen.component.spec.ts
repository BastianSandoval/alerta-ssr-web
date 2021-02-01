import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDogScreenComponent } from './edit-dog-screen.component';

describe('EditDogScreenComponent', () => {
  let component: EditDogScreenComponent;
  let fixture: ComponentFixture<EditDogScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDogScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDogScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
