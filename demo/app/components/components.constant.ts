import { Routes } from '@angular/router';


export const componentsList: Routes = [
  {
    path: 'autocomplete',
    loadChildren: `./components/autocomplete/autocomplete.module#AutocompleteModule`,
    data: {
      name: 'Autocomplete',
    },
  },
  {
    path: 'autofocus',
    loadChildren: `./components/autofocus/autofocus.module#AutofocusModule`,
    data: {
      name: 'Autofocus',
    },
  },
  {
    path: 'breakpoints',
    loadChildren: `./components/breakpoints/breakpoints.module#BreakpointsModule`,
    data: {
      name: 'Breakpoints',
    },
  },
  {
    path: 'button',
    loadChildren: `./components/button/button.module#ButtonModule`,
    data: {
      name: 'Button',
    },
  },
  {
    path: 'card',
    loadChildren: `./components/card/card.module#CardModule`,
    data: {
      name: 'Card',
    },
  },
  {
    path: 'chart',
    loadChildren: `./components/chart/chart.module#ChartModule`,
    data: {
      name: 'Chart',
    },
  },
  {
    path: 'checkbox',
    loadChildren: `./components/checkbox/checkbox.module#CheckboxModule`,
    data: {
      name: 'Checkbox',
    },
  },
  {
    path: 'confirmation',
    loadChildren: `./components/confirmation/confirmation.module#ConfirmationModule`,
    data: {
      name: 'Confirmation',
    },
  },
  {
    path: 'copy',
    loadChildren: `./components/copy/copy.module#CopyModule`,
    data: {
      name: 'Copy',
    },
  },
  {
    path: 'csv-entry',
    loadChildren: `./components/csv-entry/csv-entry.module#CSVEntryModule`,
    data: {
      name: 'CSV Entry',
    },
  },
  {
    path: 'date-range',
    loadChildren: `./components/date-range/date-range.module#DateRangeModule`,
    data: {
      name: 'Date Range',
    },
  },
  {
    path: 'expansion-panel',
    loadChildren: `./components/expansion-panel/expansion-panel.module#ExpansionPanelModule`,
    data: {
      name: 'Expansion Panel',
    },
  },
  {
    path: 'file-upload',
    loadChildren: `./components/file-upload/file-upload.module#FileUploadModule`,
    data: {
      name: 'File Upload',
    },
  },
  {
    path: 'icon',
    loadChildren: `./components/icon/icon.module#IconModule`,
    data: {
      name: 'Icon',
    },
  },
  {
    path: 'icon-button',
    loadChildren: `./components/icon-button/icon-button.module#IconButtonModule`,
    data: {
      name: 'Icon Button',
    },
  },
  {
    path: 'input',
    loadChildren: `./components/input/input.module#InputModule`,
    data: {
      name: 'Input',
    },
  },
  {
    path: 'link',
    loadChildren: `./components/link/link.module#LinkModule`,
    data: {
      name: 'Link',
    },
  },
  {
    path: 'loading-overlay',
    loadChildren: `./components/loading-overlay/loading-overlay.module#LoadingOverlayModule`,
    data: {
      name: 'Loading Overlay',
    },
  },
  {
    path: 'login-form',
    loadChildren: `./components/login-form/login-form.module#LoginFormModule`,
    data: {
      name: 'Login Form',
    },
  },
  {
    path: 'logo',
    loadChildren: `./components/logo/logo.module#LogoModule`,
    data: {
      name: 'Logo',
    },
  },
  {
    path: 'menu',
    loadChildren: `./components/menu/menu.module#MenuModule`,
    data: {
      name: 'Menu',
    },
  },
  {
    path: 'navigation',
    loadChildren: `./components/navigation/navigation.module#NavigationModule`,
    data: {
      name: 'Navigation',
    },
  },
  {
    path: 'paginator',
    loadChildren: `./components/paginator/paginator.module#PaginatorModule`,
    data: {
      name: 'Paginator',
    },
  },
  {
    path: 'pipes',
    loadChildren: `./components/pipes/pipes.module#PipesModule`,
    data: {
      name: 'Pipes',
    },
  },
  {
    path: 'radio',
    loadChildren: `./components/radio/radio.module#RadioModule`,
    data: {
      name: 'Radio',
    },
  },
  {
    path: 'scrollbars',
    loadChildren: `./components/scrollbars/scrollbars.module#ScrollbarsModule`,
    data: {
      name: 'Scrollbars',
    },
  },
  {
    path: 'search',
    loadChildren: `./components/search/search.module#SearchModule`,
    data: {
      name: 'Search',
    },
  },
  {
    path: 'select',
    loadChildren: `./components/select/select.module#SelectModule`,
    data: {
      name: 'Select',
    },
  },
  {
    path: 'spacing',
    loadChildren: `./components/spacing/spacing.module#SpacingModule`,
    data: {
      name: 'Spacing',
    },
  },
  {
    path: 'spacing-styles',
    loadChildren: `./components/spacing/spacing-styles.module#SpacingStylesModule`,
    data: {
      name: 'Spacing SCSS',
    },
  },
  {
    path: 'table',
    loadChildren: `./components/table/table.module#TableModule`,
    data: {
      name: 'Table',
    },
  },
  {
    path: 'tabs',
    loadChildren: `./components/tabs/tabs.module#TabsModule`,
    data: {
      name: 'Tabs',
    },
  },
  {
    path: 'toggle',
    loadChildren: `./components/toggle/toggle.module#ToggleModule`,
    data: {
      name: 'Toggle',
    },
  },
  {
    path: 'tooltip',
    loadChildren: `./components/tooltip/tooltip.module#TooltipModule`,
    data: {
      name: 'Tooltip',
    },
  },
  {
    path: 'typography',
    loadChildren: `./components/typography/typography.module#TypographyModule`,
    data: {
      name: 'Typography',
    },
  },
  {
    path: 'validation',
    loadChildren: `./components/validation/validation.module#ValidationModule`,
    data: {
      name: 'Validation',
    },
  },
];
