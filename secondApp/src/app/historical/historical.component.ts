import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { XYChart } from '@amcharts/amcharts4/charts';




@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {
  private chart2: am4charts.XYChart = new XYChart;

  constructor(@Inject(PLATFORM_ID) private platform:any, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platform)) {
      this.zone.runOutsideAngular((): void => {
        f();
      });
    }
  }
  ngOnInit(){}

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly((): void => {
      am4core.useTheme(am4themes_animated);

      let chart2 = am4core.create("chartdiv3", am4charts.XYChart);

      chart2.paddingRight = 20;

      let data1 = [];
      let visits1 = 0;
      for (let i = 0; i < 60; i++) {
        visits1 =i;
        data1.push({ date: new Date(2020, 1, 1,1,i), name: "name" + i, value: visits1 });
      }
     

      chart2.data = data1;

      let dateAxis = chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
     // valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth =1;

      let series = chart2.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart2.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart2.scrollbarX = scrollbarX;

      this.chart2 = chart2;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart2) {
        this.chart2.dispose();
      }
    });
  }
}
 

  
 

