import { CopyComponent } from './copy.component';
import { Routes } from '@angular/router';

import { ButtonComponent } from './button.component';
import { InputComponent } from './input.component';
import { MenuComponent } from './menu.component';
import { SelectComponent } from './select.component';
import { PaginationComponent } from './pagination.component';
import { ToggleComponent } from './toggle.component';
import { TooltipComponent } from './tooltip.component';
import { DatepickerComponent } from './datepicker.component';
import { DateRangeComponent } from './date-range.component';
import { SpacingComponent } from './spacing.component';
import { TypographyComponent } from './typography.component';
import { CheckboxComponent } from './checkbox.component';
import { LoginFormComponent } from './login-form.component';
import { LinkComponent } from './link.component';
import { WindowServiceComponent } from './window-service.component';
import { SpacingStylesComponent } from './spacing-styles.component';
// INJECT: Import demo component to constants file
// NB! The above line is required for our yeoman generator and should not be changed.

export const componentsList: Routes = [
  {
    path: 'button',
    component: ButtonComponent,
    data: {
      name: 'Button',
    },
  },
  {
    path: 'input',
    component: InputComponent,
    data: {
      name: 'Input',
    },
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      name: 'Menu',
    },
  },
  {
    path: 'select',
    component: SelectComponent,
    data: {
      name: 'Select',
    },
  },
  {
    path: 'pagination',
    component: PaginationComponent,
    data: {
      name: 'Pagination',
    },
  },
  {
    path: 'toggle',
    component: ToggleComponent,
    data: {
      name: 'Toggle',
    },
  },
  {
    path: 'copy',
    component: CopyComponent,
    data: {
      name: 'Copy',
    },
  },
  {
    path: 'tooltip',
    component: TooltipComponent,
    data: {
      name: 'Tooltip',
    },
  },
  {
    path: 'datepicker',
    component: DatepickerComponent,
    data: {
      name: 'Datepicker',
    },
  },
  {
    path: 'date-range',
    component: DateRangeComponent,
    data: {
      name: 'Date Range',
    },
  },
  {
    path: 'spacing',
    component: SpacingComponent,
    data: {
      name: 'Spacing',
    },
  },
  {
    path: 'typography',
    component: TypographyComponent,
    data: {
      name: 'Typography',
    },
  },
  {
    path: 'checkbox',
    component: CheckboxComponent,
    data: {
      name: 'Checkbox',
    },
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    data: {
      name: 'Login Form',
    },
  },
  {
    path: 'link',
    component: LinkComponent,
    data: {
      name: 'Link',
    },
  },
  {
    path: 'window-service',
    component: WindowServiceComponent,
    data: {
      name: 'Window Service',
    },
  },
  {
    path: 'spacing-styles',
    component: SpacingStylesComponent,
    data: {
      name: 'Spacing SCSS',
    },
  },
  // INJECT: Add route for demo component
  // NB! The above line is required for our yeoman generator and should not be changed.
];
