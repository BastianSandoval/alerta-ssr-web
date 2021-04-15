import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCasesComponent } from './table-cases.component';

describe('TableCasesComponent', () => {
  let component: TableCasesComponent;
  let fixture: ComponentFixture<TableCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
