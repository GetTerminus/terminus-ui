import { Component } from '@angular/core';


@Component({
  selector: 'demo-expansion-panel',
  templateUrl: './expansion-panel.component.html',
})
export class ExpansionPanelComponent {
  loadPanel = true;
  allowMultiple = false;
  activeStep = 0;


  panelOpened() {
    console.log('DEMO: Panel opened');
  }

  panelClosed() {
    console.log('DEMO: Panel closed');
  }

  panelExpandedChange(event) {
    console.log('DEMO: Panel expanded state changed: ', event);
  }

  panelDestroyed() {
    console.log('DEMO: Panel destroyed');
  }

  afterPanelExpanded() {
    console.log('DEMO: Panel expand animation finished');
  }

  afterPanelCollapsed() {
    console.log('DEMO: Panel collapse animation finished');
  }


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
