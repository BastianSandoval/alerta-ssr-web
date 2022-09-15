import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableValidatorComponent } from './table-validator.component';

describe('TableValidatorComponent', () => {
  let component: TableValidatorComponent;
  let fixture: ComponentFixture<TableValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
