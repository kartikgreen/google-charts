import { Component, Prop, State, Element, Event, EventEmitter  } from '@stencil/core';
import * as flatpickr from 'flatpickr';
@Component({
  tag: 'app-charts-events-form',
  styleUrl: 'app-charts-event-form.scss'
})
export class AppChartsEventForm {
  @Element() hostElement: HTMLElement;
  @State() selectCountry: number;
  @State() selectRegion: number;
  @Event() onSubmit: EventEmitter;
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
    this.createDatePicker('#fromDatepicker');
    this.createDatePicker('#toDatepicker');
    // fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    //   .then((data) => {console.log(data)});
  }
  createDatePicker(element) {
    flatpickr(this.hostElement.querySelectorAll(element), {
      enableTime: false,
      dateFormat: "Y-m-d",
    });
  }
  getPayload() {
    const payLoad = {
      region: this.selectRegion, 
      country: this.selectCountry,
      fromDate: this.fromDate,
      toDate: this.toDate,
      zip: this.zip,
      city: this.city,
      addressOne: this.addressOne,
      addressTwo: this.addressTwo,
      categories: this.categoriesSelected,
      global: this.global
    }
    const restrictedValues = ["", null, -1];
    return Object.keys(payLoad).reduce(function(r, e) {
      if (!restrictedValues.includes(payLoad[e])) r[e] = payLoad[e]
      return r;
    }, {})
  }
  handleSubmit(e) {
    fetch('/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.getPayload())
    }).then((res)=> res.json())
      .then((data)=> console.log('data'));
      this.onSubmit.emit({ answer: true });  
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
    if (event.target.value === 'global') {
      this.global = true;
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectCountry = null,
      this.city = null,
      this.addressOne = null,
      this.addressTwo = null,
      this.zip = null
      this.selectRegion = null
    }
    if (event.target.value === 'region') {
      this.global = false;
      this.deleteAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectCountry = null,
      this.city = null,
      this.addressOne = null,
      this.addressTwo = null,
      this.zip = null
    }
    if (event.target.value === 'country') {
      this.global = false;
      this.deleteAttribute('#country', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectRegion = null,
      this.city = null,
      this.addressOne = null,
      this.addressTwo = null,
      this.zip = null
    }
    if (event.target.value === 'city') {
      this.global = false;
      this.deleteAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectRegion = null,
      this.addressOne = null,
      this.addressTwo = null,
      this.zip = null,
      this.selectCountry = null
    }
    if (event.target.value === 'address') {
      this.global = false;
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.deleteAttribute('#zip', 'disabled');
      this.deleteAttribute('#address_one', 'disabled');
      this.deleteAttribute('#address_two', 'disabled');
      this.selectRegion = null,
      this.city = null
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
         <div class="events-widget">
           <div class="logo"><img src="/assets/images/logo.png" alt="global logo" /></div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="widget-block-1">
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
            <div class="col-block"><label class="label">
                
              <input onChange={(e) => this.handleCategories(e)} type="checkbox" class="option-input checkbox" name= 'All' value='All' />
              <span class="cat-label">All</span>
            </label>
            </div>
              {
                this.categories.map(res => 
                <div class="col-block">
                  <label class="label">
                    
                    <input type="checkbox"  class="categories option-input checkbox" name={res.value} value={res.id} onChange={(e) => this.handleCategories(e)} />
                   <span class="cat-label">{res.value}</span>
                  </label>
                  </div>
                )
              }
              
            </div>
            </div>
            <div class="widget-block-3 wid-block">
              <h4>For the following categories</h4>
              <div class="radio-group">
                <div class="col-block">
                <label>
                  <span class="label-text">
                <input type="radio" class="option-input radio" onChange={(e) => this.handlePlace(e)} name="place" value="global"/>Global
                </span>

                </label>
                </div>
                <div class="col-block">
              <label>
                <span class="label-text">
                <input type="radio" class="option-input radio" onChange={(e) => this.handlePlace(e)} name="place" value="region"/>Region 
                </span>
                <select disabled id="region" value={this.selectRegion} onInput={() => this.handleRegion(event)}>
                {
                this.region.map( res =>
                <option value={res.id}>{res.value}</option>
                )
                }
                </select>
              </label>
              </div>
              <div class="col-block">
              <label>
                <span class="label-text">
                <input type="radio" class="option-input radio" onChange={(e) => this.handlePlace(e)} name="place" value="country"/>Country
                </span>
               <select id="country" disabled value={this.selectCountry} onInput={() => this.handleCountry(event)}>
                {
                this.countryList.map(res =>
                <option value={res.id}>{res.value}</option>
                )
                }
                </select>
              </label>
              </div>
              <div class="col-block">
              <label>
                <span class="label-text">
                <input type="radio" class="option-input radio" onChange={(e) => this.handlePlace(e)} name="place" value="city"/>City
                </span>
                <input type="text" id="city" disabled value={this.city} onInput={(e) => this.handleCityChange(e)} />
              </label>
              </div>
              <div class="col-block">
              <label>
                <span class="label-text">
                 <input type="radio" class="option-input radio" onChange={(e) => this.handlePlace(e)} name="place" value="address"/>Use Address
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
            </div>
            <div class="clearfix"></div>
            <div class="widget-block-4">
              <input type="submit" class="go-btn" value="Go" />
            </div>
        </form>
        </div>
      </div>
    );
  }
}
