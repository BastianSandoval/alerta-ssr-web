import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTendersComponent } from './table-tenders.component';

describe('TableTendersComponent', () => {
  let component: TableTendersComponent;
  let fixture: ComponentFixture<TableTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
