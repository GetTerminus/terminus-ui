import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule } from '@angular/material';

import { TsValidationMessagesComponent } from './validation-messages.component';
import { ValidationService } from './../services/validation/validation.service';
import { ValidationServiceMock } from './../services/validation/validation.service.mock';


describe('InputMessagesComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdInputModule,
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

});
