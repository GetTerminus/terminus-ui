import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  TsChart,
  TsChartComponent,
  TsChartModule,
  TsChartVisualizationOptions,
} from '@terminus/ui/chart';

@Component({ template: `<ts-chart></ts-chart>` })
export class SimpleHost {
  @ViewChild(TsChartComponent, { static: true })
  public component!: TsChartComponent;
}

@Component({ template: `<ts-chart [visualization]="visualization"></ts-chart>` })
export class VisualizationsHost {
  public visualization: TsChartVisualizationOptions | undefined;

  @ViewChild(TsChartComponent, { static: true })
  public component!: TsChartComponent;
}

@Component({
  template: `
     <ts-chart
       visualization="xy"
       (chartInitialized)="chartCreated($event)"
     ></ts-chart>
   `,
})
export class TypeChecking {
  public chart!: TsChart;

  @ViewChild(TsChartComponent, { static: true })
  public component!: TsChartComponent;

  public chartCreated(chart: TsChart): void {
    this.chart = chart;
  }
}

export type TsChartTestComponent
  = SimpleHost
  | VisualizationsHost
  | TypeChecking
;

/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsChartModule,
  ],
  declarations: [
    SimpleHost,
    TypeChecking,
    VisualizationsHost,
  ],
})
export class TsChipCollectionTestComponentsModule { }
