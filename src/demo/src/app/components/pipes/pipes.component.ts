import { Component } from '@angular/core';


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
  date = new Date();
  dateString = new Date().toISOString();
}
