import { Routes } from '@angular/router';

import { BreakpointsComponent } from './breakpoints/breakpoints.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CopyComponent } from './copy/copy.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { LinkComponent } from './link/link.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MenuComponent } from './menu/menu.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { PipesComponent } from './pipes/pipes.component';
import { RadioComponent } from './radio/radio.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { SpacingComponent } from './spacing/spacing.component';
import { SpacingStylesComponent } from './spacing/spacing-styles.component';
import { TableComponent } from './table/table.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypographyComponent } from './typography/typography.component';
import { ValidationComponent } from './validation/validation.component';
import { WindowServiceComponent } from './services/window-service.component';
// INJECT: Import demo component to constants file
// NB! The above line is required for our yeoman generator and should not be changed.

export const componentsList: Routes = [
  {
    path: 'breakpoints',
    component: BreakpointsComponent,
    data: {
      name: 'Breakpoints',
    },
  },
  {
    path: 'button',
    component: ButtonComponent,
    data: {
      name: 'Button',
    },
  },
  {
    path: 'card',
    component: CardComponent,
    data: {
      name: 'Card',
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
    path: 'copy',
    component: CopyComponent,
    data: {
      name: 'Copy',
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
    path: 'input',
    component: InputComponent,
    data: {
      name: 'Input',
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
    path: 'loading-overlay',
    component: LoadingOverlayComponent,
    data: {
      name: 'Loading Overlay',
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
    path: 'menu',
    component: MenuComponent,
    data: {
      name: 'Menu',
    },
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    data: {
      name: 'Navigation',
    },
  },
  {
    path: 'pagaginator',
    component: PaginatorComponent,
    data: {
      name: 'Paginator',
    },
  },
  {
    path: 'pipes',
    component: PipesComponent,
    data: {
      name: 'Pipes',
    },
  },
  {
    path: 'radio',
    component: RadioComponent,
    data: {
      name: 'Radio',
    },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      name: 'Search',
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
    path: 'spacing',
    component: SpacingComponent,
    data: {
      name: 'Spacing',
    },
  },
  {
    path: 'spacing-styles',
    component: SpacingStylesComponent,
    data: {
      name: 'Spacing SCSS',
    },
  },
  {
    path: 'table',
    component: TableComponent,
    data: {
      name: 'Table',
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
    path: 'tooltip',
    component: TooltipComponent,
    data: {
      name: 'Tooltip',
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
    path: 'validation',
    component: ValidationComponent,
    data: {
      name: 'Validation',
    },
  },
  {
    path: 'window-service',
    component: WindowServiceComponent,
    data: {
      name: 'Window Service',
    },
  },
  // INJECT: Add route for demo component
  // NB! The above line is required for our yeoman generator and should not be changed.
];
