import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMessagesComponent } from './input-messages.component';

describe('InputMessagesComponent', () => {
  let component: InputMessagesComponent;
  let fixture: ComponentFixture<InputMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMessagesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
