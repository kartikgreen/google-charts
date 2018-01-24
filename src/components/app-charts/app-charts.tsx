import { Component, Prop, State, Element, Listen  } from '@stencil/core';
import Chart from 'chart.js';

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
    this.createPieChart(this.datas, 'pie-chart1');
    this.createPieChart(this.datas, 'pie-chart2');
    this.createPieChart(this.datas, 'pie-chart3');
  }
  createPieChart(datas, elementId) {
      new Chart(document.getElementById(elementId), {
        type: 'pie',
        data: datas,
        options: {
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050',
              responsive: true,
              maintainAspectRatio: false,
            }
        }
    });
  }
  render() {
    return (
      <div>
        <app-charts-events-form></app-charts-events-form>
        <div style={{ display: this.showCharts ? 'block' : 'none' }} class="chart-wrapper"><canvas id="pie-chart1"></canvas></div>
        <div style={{ display: this.showCharts ? 'block' : 'none' }} class="chart-wrapper"><canvas id="pie-chart2"></canvas></div>
        <div style={{ display: this.showCharts ? 'block' : 'none' }} class="chart-wrapper"><canvas id="pie-chart3"></canvas></div>
        <div class="claerfix"></div>
        
        <div>
        
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
