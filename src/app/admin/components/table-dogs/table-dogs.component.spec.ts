import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDogsComponent } from './table-dogs.component';

describe('TableDogsComponent', () => {
  let component: TableDogsComponent;
  let fixture: ComponentFixture<TableDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
