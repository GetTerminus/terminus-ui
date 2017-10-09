import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material';

import { TsValidationMessagesComponent } from './validation-messages.component';
import { ValidationService } from './../services/validation/validation.service';
import { ValidationServiceMock } from './../services/validation/validation.service.mock';


describe('InputMessagesComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
      ],
      declarations: [
        TsValidationMessagesComponent,
      ],
      providers: [
        {
          provide: ValidationService,
          useClass: ValidationServiceMock,
        }
      ],
    })
      .overrideComponent(TsValidationMessagesComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsValidationMessagesComponent);
        this.component = this.fixture.componentInstance;
      })
    ;
  }));


  it('should exist', () => {
    this.fixture.detectChanges();
    expect(this.component).toBeTruthy();
  });


  describe(`get validationMessage()`, () => {

    it(`should return messges for validation errors`, () => {
      const ERROR = {
        valid: false,
      };
      this.component.validationService.getValidatorErrorMessage = jasmine.createSpy('getValidatorErrorMessage');
      this.component.control = {
        touched: true,
        errors: {
          invalidEmail: ERROR,
        },
      };
      this.fixture.detectChanges();
      const message = this.component.validationMessage;

      expect(this.component.validationService.getValidatorErrorMessage).toHaveBeenCalledWith('invalidEmail', ERROR);
    });


    it(`should return null if the control hasn't been touched`, () => {
      const ERROR = {
        valid: false,
      };
      this.component.validationService.getValidatorErrorMessage = jasmine.createSpy('getValidatorErrorMessage');
      this.component.control = {
        touched: false,
        errors: {
          invalidEmail: ERROR,
        },
      };
      this.fixture.detectChanges();
      const message = this.component.validationMessage;

      expect(this.component.validationService.getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });

  });

});
