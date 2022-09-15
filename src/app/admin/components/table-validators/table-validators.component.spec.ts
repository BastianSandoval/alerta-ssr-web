import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableValidatorsComponent } from './table-validators.component';

describe('TableValidatorsComponent', () => {
  let component: TableValidatorsComponent;
  let fixture: ComponentFixture<TableValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableValidatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
