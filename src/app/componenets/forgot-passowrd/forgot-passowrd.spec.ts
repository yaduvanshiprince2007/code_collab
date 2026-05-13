import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassowrd } from './forgot-passowrd';

describe('ForgotPassowrd', () => {
  let component: ForgotPassowrd;
  let fixture: ComponentFixture<ForgotPassowrd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassowrd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassowrd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
