import { Component } from '@angular/core';
import { TsSentenceCasePipe } from '@terminus/ui';


@Component({
  selector: 'demo-pipes',
  styles: [`
    strong {
      display: block;
    }
    pre {
      font-size: 12px;
    }
  `],
  templateUrl: './pipes.component.html',
})
export class PipesComponent {
  date = new Date(2018, 1, 8);
  dateString = this.date.toISOString();
  oldDate = new Date(2018, 1, 3);
  myString = this.sentenceCasePipe.transform('ANOTHER STRING');

  constructor(
    private sentenceCasePipe: TsSentenceCasePipe,
  ) {}


}
