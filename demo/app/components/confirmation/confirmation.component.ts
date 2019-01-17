import { Component } from '@angular/core';


@Component({
  selector: 'demo-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {
  progress = false;

  explanation = `Are you sure you want to do the thing you clicked to do?`;

  cancel(v: boolean) {
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
