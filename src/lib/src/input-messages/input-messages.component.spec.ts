import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule } from '@angular/material';

import { TsInputMessagesComponent } from './input-messages.component';


describe('InputMessagesComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdInputModule,
      ],
      declarations: [
        TsInputMessagesComponent,
      ],
    })
      .overrideComponent(TsInputMessagesComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsInputMessagesComponent);
        this.component = this.fixture.componentInstance;
      })
    ;
  }));


  it('should exist', () => {
    this.fixture.detectChanges();
    expect(this.component).toBeTruthy();
  });

});
