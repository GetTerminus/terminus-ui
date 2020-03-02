import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TsTabCollectionComponent } from '@terminus/ui/tabs';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'demo-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements OnInit {
  isBelow = false;
  tabAlignment$ = new BehaviorSubject('start');
  tabAlignment = 'start';
  eventsIndex: number | undefined;
  alignmentControl = new FormControl('start');
  dynamicTabs = ['First', 'Second', 'Third'];

  @ViewChild('tabCollection', {static: true})
  public tabCollection!: TsTabCollectionComponent;


  /**
   * Helper for layout demo
   */
  ngOnInit() {
    this.alignmentControl.valueChanges.subscribe(newValue => {
      // Realign the ink bar when programmatically moving tab labels
      this.tabCollection.realignInkBar();
    });
  }


  /**
   * Helpers for dynamic tabs demo
   */
  insertTab() {
    this.dynamicTabs.push('Fourth');
  }

  insertTabAtLocation(index) {
    this.dynamicTabs.splice(index, 0, 'New New!');
  }


  /**
   * Helpers for events demo
   */
  updateIndex() {
    this.eventsIndex = !(this.eventsIndex) ? 1 : 0;
  }

  animationFinished() {
    console.log('DEMO: Tab animation finished.');
  }

  focusChange(e) {
    console.log('DEMO: Tab focus changed ', e);
  }

  indexChange(e) {
    console.log('DEMO: Tab selected index changed: ', e);
  }

  tabChange(e) {
    console.log('DEMO: Selected tab changed: ', e);
  }

}
