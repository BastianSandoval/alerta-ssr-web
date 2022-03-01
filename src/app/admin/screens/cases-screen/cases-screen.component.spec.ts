import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDogsScreenComponent } from './cases-screen.component';

describe('ListDogsScreenComponent', () => {
  let component: ListDogsScreenComponent;
  let fixture: ComponentFixture<ListDogsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDogsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDogsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
