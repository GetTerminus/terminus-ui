import { Component } from '@angular/core';


@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
})
export class ExpansionPanelComponent {
  loadPanel = true;
  allowMultiple = false;
  activeStep = 0;

  nextStep() {
    this.activeStep++;
  }

  previousStep() {
    this.activeStep--;
  }

  setStep(index) {
    this.activeStep = index;
  }

}
