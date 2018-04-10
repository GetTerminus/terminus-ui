import { Component } from '@angular/core';


@Component({
  selector: 'demo-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {
  progress = false;

  cancel(v) {
    console.log('DEMO: Cancel: ', v);
  }

  submit() {
    console.log('DEMO: Real Submit');
    this.progress = true;

    setTimeout(() => {
      this.progress = false;
    }, 2000);
  }

}
