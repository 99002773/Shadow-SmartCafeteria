import { color } from '@amcharts/amcharts4/core';
import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content1: any;
  content2: any;
  chartData:any;
  str:any;

  constructor(private serve:ServicesService){}
  title = 'secondApp';
isDisplay=false;
toggleDisplay(){
  this.isDisplay=!this.isDisplay;
}
ngOnInit(): void {
  this.loadData();
  this.diningCount();
  this.serviceCount();
}
loadData()
{
this.chartData=[{
  "date": "2012-07-27",
  "value": 13
}, {
  "date": "2012-07-28",
  "value": 11
}, {
  "date": "2012-07-29",
  "value": 15
}, {
  "date": "2012-07-30",
  "value": 16
}, {
  "date": "2012-07-31",
  "value": 18
}, {
  "date": "2012-08-01",
  "value": 13
}, {
  "date": "2012-08-02",
  "value": 22
}, {
  "date": "2012-08-03",
  "value": 23
}, {
  "date": "2012-08-04",
  "value": 20
}, {
  "date": "2012-08-05",
  "value": 17
}, {
  "date": "2012-08-06",
  "value": 16
}, {
  "date": "2012-08-07",
  "value": 18
}, {
  "date": "2012-08-08",
  "value": 21
}];
}
diningCount(): void
{
  this.serve.getRequest('getCountbyDining/2020-12-01 01:35:00').subscribe(data1=>{
    this.content1=data1;
  })

  if(this.content1>=130)
{
  this.str="Crowded";
  let color1= < HTMLInputElement >document.getElementById("str1");
  color1.style.color="#FF0000";
 //color.apply(this.str,FF0000);
}
else if(this.content1>=80&&this.content1<=110)
{
  this.str="Moderate"
}
else{
  this.str="Free"
  let color2= < HTMLInputElement >document.getElementById("str1");
  color2.innerHTML="Test";
  color2.style.color="#FF0000";
}

}
serviceCount()
{
  this.serve.getRequest('getCountbyService/2020-12-01 01:40:00').subscribe(data2=>{
    this.content2=data2;
  })
  if(this.content2>=130)
  {
    this.str="Crowded";
  }
  else if(this.content2>=80&&this.content2<=110)
  {
    this.str="Moderate"
  }
  else{
    this.str="Free"
  }
}




}


