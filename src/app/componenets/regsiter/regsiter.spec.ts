import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regsiter } from './regsiter';

describe('Regsiter', () => {
  let component: Regsiter;
  let fixture: ComponentFixture<Regsiter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regsiter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regsiter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
