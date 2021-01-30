import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDogScreenComponent } from './add-dog-screen.component';

describe('AddDogComponent', () => {
  let component: AddDogScreenComponent;
  let fixture: ComponentFixture<AddDogScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDogScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDogScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
