import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsButtonModule } from './../button/button.module';
import { TsSelectModule } from './../select/select.module';

import { TsPaginationComponent } from './pagination.component';

@Component({
  template: `
    <div>
      <ts-pagination>
      </ts-pagination>
    </div>
  `,
})
class TestHostComponent {}

describe(`PaginationComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TsButtonModule,
        TsSelectModule,
      ],
      declarations: [
        TsPaginationComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsPaginationComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});

