import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersScreenComponent } from './tenders-screen.component';

describe('TendersScreenComponent', () => {
  let component: TendersScreenComponent;
  let fixture: ComponentFixture<TendersScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendersScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
