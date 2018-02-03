// Components
export { TsButtonModule } from './src/button/button.module';
export { TsCardModule } from './src/card/card.module';
export { TsCheckboxModule } from './src/checkbox/checkbox.module';
export { TsCopyModule } from './src/copy/copy.module';
export { TsDateRangeModule } from './src/date-range/date-range.module';
export { TsDatepickerModule } from './src/datepicker/datepicker.module';
export { TsInputModule } from './src/input/input.module';
export { TsLinkModule } from './src/link/link.module';
export { TsLoadingOverlayModule } from './src/loading-overlay/loading-overlay.module';
export { TsLoginFormModule } from './src/login-form/login-form.module';
export { TsMenuModule } from './src/menu/menu.module';
export { TsNavigationModule } from './src/navigation/navigation.module';
export { TsPaginatorModule } from './src/paginator/paginator.module';
export { TsPipesModule } from './src/pipes/pipes.module';
export { TsRadioGroupModule } from './src/radio-group/radio-group.module';
export { TsSearchModule } from './src/search/search.module';
export { TsSelectModule } from './src/select/select.module';
export { TsSortModule } from './src/sort/sort.module';
export { TsSpacingModule } from './src/spacing/spacing.module';
export { TsTableModule } from './src/table/table.module';
export { TsToggleModule } from './src/toggle/toggle.module';
export { TsTooltipModule } from './src/tooltip/tooltip.module';
export { TsValidationMessagesModule } from './src/validation-messages/validation-messages.module';
export { TsIconModule } from './src/icon/icon.module';
// INJECT: Export the UI component from the module index
// NB! The above line is required for our yeoman generator and should not be changed.

// NOTE(B$): I'm not sure why these must be here but all other components seem to be able to export
// from their own module files.
// TODO: Move to index.ts barrell files in each component; then export all barrells here.
export * from './src/table/table-data-source';
export * from './src/table/row';
export * from './src/table/cell';
export * from './src/sort/sort.directive';
export * from './src/paginator/paginator.component';

// Utilities & Services
export { TsDocumentService } from './src/services/document/document.service';
export { TsValidatorsService } from './src/services/validators/validators.service';
export { TsWindowService } from './src/services/window/window.service';
export { TS_SPACING } from './src/spacing/spacing.constant';
export * from './src/utilities/interfaces/index';
export * from './src/utilities/types/index';

// Export the Module
export { TerminusUIModule } from './src/module';
