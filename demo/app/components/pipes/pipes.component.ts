import { Component } from '@angular/core';
import { TsSentenceCasePipe } from '@terminus/ui/pipes';


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
  myString = 'ANOTHER STRING';
  myStringTransformed = this.sentenceCasePipe.transform(this.myString);

  constructor(
    private sentenceCasePipe: TsSentenceCasePipe,
  ) {}

}
