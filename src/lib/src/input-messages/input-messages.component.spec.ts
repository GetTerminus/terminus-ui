import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule } from '@angular/material';

import { TsInputMessagesComponent } from './input-messages.component';

describe('InputMessagesComponent', () => {
  let component: TsInputMessagesComponent;
  let fixture: ComponentFixture<TsInputMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdInputModule,
      ],
      declarations: [
        TsInputMessagesComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsInputMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
