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
  categories = ['All', 'Sports', 'Entertainment', 'Business', 'Travel Alerts',
   'Weather', 'Holidays', 'Political'];
  categoriesSelected = [];
  region = ['Europe', 'Asia', 'Africa'];
  countryList = ['USA', 'IND', 'PAK'];
  checkedValue;
  city;
  addressOne;
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
    console.log('submit', this.selectCountry, this.selectRegion);
    console.log('cat selected', this.categoriesSelected);
    e.preventDefault();
  }
  handleRegion(event) {
    console.log(event.target.value);
    this.selectRegion = event.target.value;
  }
  handleCountry(event) {
    console.log(event.target.value);
    this.selectCountry = event.target.value;
  }
  handleCategories(event) {
    const obj = {};
    obj[event.target.value] = event.target.checked;
    if (event.target.checked) {
      this.categoriesSelected.push(obj);
      return;
    }
    const key = Object.keys(obj);
    this.categoriesSelected = this.categoriesSelected.reduce(function(arr, item){
    if(!(Object.keys(item).indexOf(key[0])!=-1))
      arr.push(item);
      return arr;
    },[]);
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
  render() {
    return (
      <div>
        <button id="myBtn">My Button</button>
        <div class="chart-wrapper"><canvas id="pie-chart"></canvas></div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            From Date:
            <input type="text" id="fromDatepicker" class="flatpickr" placeholder="Select a from date" />
          </label>
          <label>
            To Date:
            <input type="text" id="toDatepicker" class="flatpickr" placeholder="Select a to date" />
          </label>
          <h4>Show all the following categories</h4>
            <div class="checkbox-group">
              {
                this.categories.map(res => 
                  <label>
                    {res}:
                    <input type="checkbox" name={res} value={res} onChange={(e) => this.handleCategories(e)} />
                  </label>
                )
              }
            </div>
            <div>
              <h4>For the following categories</h4>
              <div>
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="region"/>Region<br/>
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="country"/> Country<br/>
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="city"/> City<br/> 
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="address"/> Use Address<br/> 
              </div>
              <label>
                Region:
                <select disabled id="region" value={this.selectRegion} onInput={() => this.handleRegion(event)}>
                  {
                    this.region.map( res =>
                      <option value={res}>{res}</option>
                    )
                  }
                </select>
              </label>
              <label>
                Country:
                <select id="country" disabled value={this.selectCountry} onInput={() => this.handleCountry(event)}>
                  {
                    this.countryList.map(res =>
                      <option value={res}>{res}</option>
                    )
                  }
                </select>
              </label>
              <label>
                City:
                <input type="text" id="city" disabled value={this.city} onInput={(e) => this.handleCityChange(e)} />
              </label>
              <label>
                 Address1:
                <input type="text" id="address_one" disabled value={this.addressOne} onInput={(e) => this.handleAddressOneChange(e)} />
              </label>
              <label>
                 Address2:
                <input type="text" id="address_two" disabled value={this.addressTwo} onInput={(e) => this.handleAddressTwoChange(e)} />
              </label>
              <label>
                 Zip:
                <input type="text" id="zip" disabled value={this.zip} onInput={(e) => this.handleZipChange(e)} />
              </label>
            </div>
          <input type="submit" value="Submit" />
        </form>
        <pre>{this.categoriesSelected}</pre>
      </div>
    );
  }
}
