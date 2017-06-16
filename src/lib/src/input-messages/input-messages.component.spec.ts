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
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsInputMessagesComponent);
        this.component = this.fixture.componentInstance;
        this.fixture.detectChanges();
      })
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(TsInputMessagesComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  });


  it('should be created', () => {
    expect(this.component).toBeTruthy();
  });

});
