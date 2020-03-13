import {
  Component,
  NgZone,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsDrawerContainerComponent } from '@terminus/ui/drawer';
import { TsRadioFormatFn } from '@terminus/ui/radio-group';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';

@Component({
  selector: 'demo-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  public myForm: FormGroup = this.formBuilder.group({
    isSmall: false,
    isCentered: true,
    myRadioGroup: [
      null,
      [
        Validators.required,
      ],
    ],
    myRadioGroup2: [
      'bar2_value',
      [
        Validators.required,
      ],
    ],
  });
  public modeControl = new FormControl('push');
  public mode2Control = new FormControl('overlay');
  public items = [{
    display: 'Overlay the Content',
    value: 'overlay',
  }, {
    display: 'Push Over the Content',
    value: 'push',
  }];

  public positionControl = new FormControl('start');
  public position2Control = new FormControl('end');
  public positions = [{
    display: 'First drawer opens on the left',
    value: 'start',
  }, {
    display: 'First drawer opens on the right',
    value: 'end',
  }];

  public uiFormatter: TsRadioFormatFn = v => v.display;
  public modelFormatter: TsRadioFormatFn = v => v.value;

  public theme: TsStyleThemeTypes = 'warn';
  public position = 'end';

  @ViewChild('drawerContainer', { static: false })
  public drawerContainer!: TsDrawerContainerComponent;

  constructor(
    private formBuilder: FormBuilder,
    public zone: NgZone,
  ) { }
}
