import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/Models/user";
import { ClickFunctionsService } from "src/app/Services/click-functions.service";

@Component({
  selector: "app-simple-org",
  templateUrl: "./simple-org.component.html",
  styleUrls: ["./simple-org.component.scss"]
})
export class SimpleOrgComponent implements OnInit {
  @Input() org: User;
  @Input() dayTime;

  address: string;
  emailPlaceHolder: string = "Email Us";
  clipboard: boolean = false;

  hoursOfOpString: string;
  hoursOfOpContext: string;
  hoursOfOpOpen: boolean;

  hoursServingFoodString: string;
  hoursServingFoodContext: string;
  hoursServingFoodNow: boolean;

  bedString: string;
  bedContext: string;


  days: Array<string> = [
    "Sun",
    "Mon",
    "Tues",
    "Wen",
    "Thur",
    "Fri",
    "Sat"
  ];

  constructor(private clickFunction: ClickFunctionsService) {}

  ngOnInit() {
    this.createAddress();

    // Get Hours of Operation
    this.checkIfOpenToday('HOP');

    // Get Hours Serving Food
    if (this.org.services.servesFood){
      this.checkIfOpenToday('food');
    }

    this.checkBedAvailability();
  }

  checkBedAvailability() {
    if(this.org.services.beds){
      this.bedString = 'Beds Available Now'
    }
  }

  async checkIfOpenToday(inputService: string) {
    let service;
    const day = this.dayTime.dayOfWeek;

    if(inputService === 'HOP') {
      service = this.org.hoursOfOperation;
      if(service[day].isClosed) {
        this.setasClosed('HOP');
        return
      }
    } else if ( inputService === 'food'){
      service = this.org.hoursServingFood;
    }

    const openTime = await this.extractTimeOfService(service[day].open);
    const closeTime = await this.extractTimeOfService(service[day].close);

    this.checkIfNow(openTime, closeTime, service);
  
  }

  checkIfNow(openTime, closeTime, service) {
    let string;
    let context;
    let open;
    let serviceString;

    if( service === this.org.hoursOfOperation ){
      string = this.hoursOfOpString;
      context = this.hoursOfOpContext;
      open = this.hoursOfOpOpen;
      serviceString = 'HOP';
    } else if ( service === this.org.hoursServingFood ){
      string = this.hoursServingFoodString;
      context = this.hoursServingFoodContext;
      open = this.hoursServingFoodNow;
      serviceString = 'food';
    };
    
    if (this.dayTime.meridiem >= openTime.meridiem) {
      if (
        this.dayTime.hour >= openTime.hour &&
        this.dayTime.hour <= closeTime.hour
      ) {
        if (
          this.dayTime.minute >= openTime.minute &&
          this.dayTime.minute <= closeTime.minute
        ) {
          string = "Open Now";
          context =
            "until " + service[this.dayTime.dayOfWeek].close;
          open = true;
        } else {
          this.setasClosed(serviceString);
        }
      } else {
        this.setasClosed(serviceString);
      }
    } else {
      this.setasClosed(serviceString);
    }
  }
  
  setasClosed(service) {
    let nextOpenDay = this.nextOpen(service)
    
    if( service === 'HOP' ) {
      
      this.hoursOfOpString = "Closed";
      this.hoursOfOpContext = "open "+ this.days[nextOpenDay[1]] + ' at ' + nextOpenDay[0];
      this.hoursOfOpOpen = false;
    } else if ( service === 'food' ) {
      this.hoursServingFoodString = "Serving Food ";
      
      this.hoursServingFoodContext = this.days[nextOpenDay[1]] + ' at ' + nextOpenDay[0];
      this.hoursServingFoodNow = false;
    }
  }

  nextOpen(type) {
    let service;
    const day = this.dayTime.dayOfWeek;

    if(type === 'HOP'){
      service = this.org.hoursOfOperation; 
    } else if ( type == 'food') {
      service = this.org.hoursServingFood;
    }

    for (let index = 1; index < 9; index++) {
      if (day + index >= 7) {
        let temp = 0;
        if (service[temp].isClosed) {
        } else {
          return [service[temp].open, temp];
        }
        temp++;
      } else {
        if (service[day + index].isClosed) {
        } else {
          return [service[day + index].open, day + index];
        }
      }
    }
  }

  extractTimeOfService(time: string) {
    let meridiemSplit = time.split(" ")[1];
    let meridiem;

    if (meridiemSplit === "AM") {

      meridiem = 0;
    } else if (meridiemSplit === "PM") {
      meridiem = 1;
    }

    let hourSplit = time.split(":")[0];
    let hour = parseInt(hourSplit, 10);

    let minSplit = time.split(":")[1];
    let minString = minSplit.substr(0, minSplit.indexOf(" "));
    let minute = parseInt(minString, 10);

    return { hour, minute, meridiem };
  }

  async createAddress() {
    this.address = await this.org.fullAddress.substr(
      0,
      this.org.fullAddress.lastIndexOf(",")
    );
  }

  visitWebsite(URL: string) {
    this.clickFunction.visitWebsite(URL);
  }

  getDirections(address: string) {
    this.clickFunction.openAddressInGoogleMaps(address);
  }

  copyEmail(email: string) {
    this.clickFunction.copyToClipboard(email);

    this.emailPlaceHolder = "Copied to your Clipboard";
    this.clipboard = true;

    setTimeout(() => {
      this.emailPlaceHolder = "Email Us";
      this.clipboard = false;
    }, 3000);
  }
}
