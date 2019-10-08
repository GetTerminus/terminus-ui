import { Component } from '@angular/core';


@Component({
  selector: 'demo-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  inProgress = false;
  startingValue = '';
  shouldAutoSubmit = true;


  onSubmit(query: string): void {
    console.warn('DEMO: submission!', query);
    this.inProgress = true;

    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }


  onClear(): void {
    console.log('DEMO: search cleared!');
  }

  onChange(value: string): void {
    console.log('DEMO: search input changed: ', value);
  }

}
