import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule } from '@angular/material';

import { TsValidationMessagesComponent } from './validation-messages.component';


describe('InputMessagesComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdInputModule,
      ],
      declarations: [
        TsValidationMessagesComponent,
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
