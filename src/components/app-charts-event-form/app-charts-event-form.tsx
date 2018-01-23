import { Component, Prop, State, Element, Event, EventEmitter  } from '@stencil/core';
import flatpickr from "flatpickr";
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
    this.createDatePicker('fromDatepicker');
    this.createDatePicker('toDatepicker');
    // fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    //   .then((data) => {console.log(data)});
  }
  createDatePicker(element) {
    flatpickr(document.getElementById(element), {
      enableTime: false,
      dateFormat: "Y-m-d",
    });
  }
  handleSubmit(e) {
    // fetch('/post', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify({region: this.selectRegion, 
    //                         country: this.selectCountry,
    //                         fromDate: this.fromDate,
    //                         toDate: this.toDate,
    //                         zip: this.zip,
    //                         city: this.city,
    //                         addressOne: this.addressOne,
    //                         addressTwo: this.addressTwo,
    //                         categories: this.categoriesSelected,
    //                         global: this.global
    //                       })
    // }).then((res)=> res.json())
    //   .then((data)=> console.log('data'));
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
      this.selectCountry = -1,
      this.city = -1,
      this.addressOne = -1,
      this.addressTwo = -1,
      this.zip = -1
      this.selectRegion = -1
    }
    if (event.target.value === 'region') {
      this.global = false;
      this.deleteAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectCountry = -1,
      this.city = -1,
      this.addressOne = -1,
      this.addressTwo = -1,
      this.zip = -1
    }
    if (event.target.value === 'country') {
      this.global = false;
      this.deleteAttribute('#country', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectRegion = -1,
      this.city = -1,
      this.addressOne = -1,
      this.addressTwo = -1,
      this.zip = -1
    }
    if (event.target.value === 'city') {
      this.global = false;
      this.deleteAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.addAttribute('#zip', 'disabled');
      this.addAttribute('#address_one', 'disabled');
      this.addAttribute('#address_two', 'disabled');
      this.selectRegion = -1,
      this.addressOne = -1,
      this.addressTwo = -1,
      this.zip = -1,
      this.selectCountry = -1
    }
    if (event.target.value === 'address') {
      this.global = false;
      this.addAttribute('#city', 'disabled');
      this.addAttribute('#region', 'disabled');
      this.addAttribute('#country', 'disabled');
      this.deleteAttribute('#zip', 'disabled');
      this.deleteAttribute('#address_one', 'disabled');
      this.deleteAttribute('#address_two', 'disabled');
      this.selectRegion = -1,
      this.city = -1
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
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            From Date:
            <input type="text" required id="fromDatepicker" onInput={(e) => this.handleFromDateChange(e)} class="flatpickr" placeholder="Select a from date" />
          </label>
          <label>
            To Date:
            <input type="text" required id="toDatepicker" onInput={(e) => this.handleToDateChange(e)} class="flatpickr" placeholder="Select a to date" />
          </label>
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
            <div>
              <h4>For the following categories</h4>
              <div>
                <input type="radio" onChange={(e) => this.handlePlace(e)} name="place" value="global"/>Global<br/>
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
                      <option value={res.id}>{res.value}</option>
                    )
                  }
                </select>
              </label>
              <label>
                Country:
                <select id="country" disabled value={this.selectCountry} onInput={() => this.handleCountry(event)}>
                  {
                    this.countryList.map(res =>
                      <option value={res.id}>{res.value}</option>
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
