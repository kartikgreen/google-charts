import { Component, Prop, State, Element, Listen  } from '@stencil/core';
import Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
Highcharts3d(Highcharts);

@Component({
  tag: 'app-charts',
  styleUrl: 'app-charts.scss'
})

export class AppCharts {
  @Element() hostElement: HTMLElement;
  @State() selectCountry: number;
  @State() selectRegion: number;
  @State() showCharts: boolean = false;
  global: boolean = false;
  categories = [{id:1, value: 'Sports'}, {id:2, value: 'Politics'}, {id:3, value: 'Bussiness'}, {id:4, value: 'EnterTainment'}];
  categoriesSelected = [];
  region = [{id:1, value: 'Europe'}, {id:2, value: 'Asia'}, {id:3, value: 'Africa'}, {id:4, value: 'Australia'}];
  countryList = [{id:1, value: 'INDIA'}, {id:2, value: 'PAKISTAN'}, {id:3, value: 'AFGHANISTAN'}, {id:4, value: 'KAZAKASTHAN'}];
  city;
  addressOne;
  fromDate;
  toDate;
  addressTwo;
  zip;
  @Listen('onSubmit')
  log(event) {
    console.log('form is submitted', event.detail);
    this.showCharts = true;
  }
  handleCityChange(event) {
    this.city = event.target.value;
  }
  handleAddressOneChange(event) {
    this.addressOne = event.target.value;
  }
  handleAddressTwoChange(event) {
    this.addressTwo = event.target.value;
  }
  handleZipChange(event) {
    this.zip = event.target.value;
  }
  @Prop() datas = {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3cba9f"],
      data: [2478,5267,734,784,433,437],
    }]
  };
  componentDidLoad() {
    this.createPieChart('container1');
    this.createPieChart('container2');
  }
  createPieChart(element) {
     Highcharts.setOptions({
colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5']
});
Highcharts.chart(element, {
credits: false,
chart: {
type: 'pie',
options3d: {
enabled: true,
alpha: 45
},
},
title: {
text: 'Events data'
},
tooltip: {
pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
plotOptions: {
pie: {
allowPointSelect: true,
cursor: 'pointer',
depth: 35,
dataLabels: {
enabled: true,
format: '{point.name}'
}
}
},
series: [{
type: 'pie',
name: 'Events share',
data: [
['Sports', 45.0],
['Politics', 26.8],
['Business', 8.5],
['Entertainment', 6.2],
['Business', 0.7]
]
}]
});
  }
  render() {
    return (
      <div>
        <app-charts-events-form></app-charts-events-form>
   <div style={{ display: this.showCharts ? 'block' : 'none' }} id="container1" class="chart-wrapper"></div>
   <div style={{ display: this.showCharts ? 'block' : 'none' }} id="container2" class="chart-wrapper"></div>
        <div class="claerfix"></div>
        
        <div style={{ display: this.showCharts ? 'block' : 'none' }}>
        
          <h3>Plans</h3>
          <table class="price-table">
            <tr>
              <th>Plan Type</th>
              <th>Description</th>
              <th>Cost</th>
              <th></th>
            </tr>
            <tr>
              <td>Plan Type 1</td>
              <td>Description of plan type</td>
              <td>$149.00</td>
              <td><a href="">Add to cart</a></td>
            </tr>
            <tr>
              <td>Plan Type 2</td>
              <td>Description of plan type</td>
              <td>$249.00</td>
              <td><a href="">Add to cart</a></td>
            </tr>
            <tr>
              <td>Plan Type 3</td>
              <td>Description of plan type</td>
              <td>$349.00</td>
              <td><a href="">Add to cart</a></td>
            </tr>
            <tr>
              <td>Plan Type 4</td>
              <td>Description of plan type</td>
              <td>$749.00</td>
              <td><a href="">Add to cart</a></td>
            </tr>
          </table>
        </div>
      
      </div>
    );
  }
}
