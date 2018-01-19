import { Component, Prop, State, Element  } from '@stencil/core';
import Chart from 'chart.js';
import flatpickr from "flatpickr";
@Component({
  tag: 'app-charts',
  styleUrl: 'app-charts.scss'
})
export class AppCharts {
  @Element() hostElement: HTMLElement;
  @State() selectCountry: string;
  @State() selectRegion: string;
  categories = [{id:1, value: 'Sports'}, {id:2, value: 'Politics'}, {id:3, value: 'Bussiness'}, {id:4, value: 'EnterTainment'}];
  categoriesSelected = [];
  region = ['Europe', 'Asia', 'Africa'];
  countryList = ['USA', 'IND', 'PAK'];
  city;
  addressOne;
  fromDate;
  toDate;
  addressTwo;
  zip;
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
    var x = this.hostElement.querySelector('#box').hasAttribute('checked');
    console.log('x', x);
    this.createDatePicker('fromDatepicker');
    this.createDatePicker('toDatepicker');
    this.createPieChart(this.datas);
    fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
      .then((data) => {console.log(data)});
  }
  createDatePicker(element) {
    flatpickr(document.getElementById(element), {
      enableTime: false,
      dateFormat: "Y-m-d",
    });
  }
  createPieChart(datas) {
      new Chart(document.getElementById("pie-chart"), {
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
  handleSubmit(e) {
    console.log('Onsubmit->','city->',this.city,
    'address one->',this.addressOne,
    'address two->', this.addressTwo,
    'from date->',this.fromDate,
    'To date->',this.toDate,
    'zip->',this.zip, 
    'selected region->',this.selectRegion,
    'selected country->', this.selectCountry);
    console.log('cat selected', this.categoriesSelected);
    e.preventDefault();
  }
  handleRegion(event) {
    console.log(event.target.value);
    this.selectRegion = event.target.value;
  }
  handleFromDateChange(event) {
    this.fromDate = event.target.value;
  }
  handleToDateChange(event) {
    this.toDate = event.target.value;
  }
  handleCountry(event) {
    console.log(event.target.value);
    this.selectCountry = event.target.value;
  }
  handleCategories(event) {
    if (event.target.checked) {
      if (event.target.value === 'All') {
        this.categoriesSelected = this.categories.map(m => m.id);
        this.selectAll()
        return;
      }
      this.categoriesSelected.push(event.target.value);
      return;
    }
    if (event.target.value === 'All') {
      this.unSelectAll();
      this.categoriesSelected = [];
    }
    this.categoriesSelected = this.categoriesSelected.filter(r => r != event.target.value);
  }
  handlePlace(event) {
    if (event.target.value === 'region') {
      this.deleteAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
    }
    if (event.target.value === 'country') {
      this.deleteAttribute('#country', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
    }
    if (event.target.value === 'city') {
      this.deleteAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
    }
    if (event.target.value === 'address') {
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.deleteAttribute('#zip', 'disabled');
      this.deleteAttribute('#address_one', 'disabled');
      this.deleteAttribute('#address_two', 'disabled');
    }
  }
  deleteAttribute(element, attribute) {
    this.hostElement.querySelector(element).removeAttribute(attribute);
  }
  addAttribute(element, attribute) {
    this.hostElement.querySelector(element).setAttribute(attribute, '');
  }
  selectAll() {
    const checkboxes: any  = this.hostElement.querySelectorAll('.categories');
    let i = 0;
    while(i < checkboxes.length) {
      checkboxes[i].checked = true;
      i++;
    }
  }
  unSelectAll() {
    const checkboxes: any = this.hostElement.querySelectorAll('.categories');
    let i = 0;
    while (i < checkboxes.length) {
      checkboxes[i].checked  = false;
      i++;
    }
  }
  render() {
    return (
      <div>

        <input value="hello" id="box" checked type="checkbox"/>
        
         <div class="events-widget">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="widget-block-1 wid-block">
           <h4>Run an Event Count</h4>
          <label>
            <span class="text-label">Between </span>
            <input type="text" id="fromDatepicker" onInput={(e) => this.handleFromDateChange(e)} class="flatpickr" placeholder="Select a from date" />
          </label>
          <label>
            <span class="text-label">and</span>
            <input type="text" id="toDatepicker" onInput={(e) => this.handleToDateChange(e)} class="flatpickr" placeholder="Select a to date" />
          </label>
          </div>
          <div class="widget-block-2 wid-block">
          <h4>Show all the following categories</h4>
            <div class="checkbox-group">
            <label>
                All:
              <input onChange={(e) => this.handleCategories(e)} type="checkbox" name= 'All' value='All' />
            </label>
              {
                this.categories.map(res => 
                  <label>
                    {res.value}:
                    <input type="checkbox" class="categories" name={res.value} value={res.id} onChange={(e) => this.handleCategories(e)} />
                  </label>
                )
              }
            </div>
            </div>
            <div class="widget-block-3 wid-block">
              <h4>For the following categories</h4>
              <div class="radio-group">
              <label>
                <span class="label-text">
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="region"/>Region 
                </span>
                <select disabled id="region" value={this.selectRegion} onInput={() => this.handleRegion(event)}>
                  {
                    this.region.map( res =>
                      <option value={res}>{res}</option>
                    )
                  }
                </select>
              </label>
              <label>
                <span class="label-text">
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="country"/> Country
                </span>
                <select id="country" disabled value={this.selectCountry} onInput={() => this.handleCountry(event)}>
                  {
                    this.countryList.map(res =>
                      <option value={res}>{res}</option>
                    )
                  }
                </select>
              </label>
              <label>
                <span class="label-text">
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="city"/> City
                </span>
                <input type="text" id="city" disabled value={this.city} onInput={(e) => this.handleCityChange(e)} />
              </label>
              <label>
                <span class="label-text">
                 <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="address"/> Use Address
                </span>
                <input placeholder="Address 1" type="text" id="address_one"  disabled value={this.addressOne} onInput={(e) => this.handleAddressOneChange(e)} />
              </label>
              <label>
                <span class="label-text">
                 
                 </span>
                <input  placeholder="Address 2" type="text" id="address_two" disabled value={this.addressTwo} onInput={(e) => this.handleAddressTwoChange(e)} />
              </label>
              <label>
                <span class="label-text">
                 
                 </span>
                <input  placeholder="Zip" type="text" id="zip" disabled value={this.zip} onInput={(e) => this.handleZipChange(e)} />
              </label>
            </div>
            </div>
            <div class="widget-block-4 wid-block">
              <h4> .</h4>
              <input type="submit" value="Submit" />
            </div>
            <div class="clearfix"></div>
          
        </form>
        </div>
        <div class="chart-block">
          <div class="chart-wrapper"><canvas id="pie-chart"></canvas></div>
          <div class="chart-wrapper"><canvas id="pie-chart1"></canvas></div>
          <div class="chart-wrapper"><canvas id="pie-chart2"></canvas></div>
          <div class="clearfix"></div>
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
        <pre>{this.categoriesSelected}</pre>
      </div>
      
    );
  }
}
