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

  days: Array<string> = ["Sun", "Mon", "Tues", "Wen", "Thur", "Fri", "Sat"];

  constructor(private clickFunction: ClickFunctionsService) {}

  ngOnInit() {
    this.createAddress();

    // Get Hours of Operation
    this.checkIfOpenToday("HOP");

    // Get Hours Serving Food
    if (this.org.services.servesFood) {
      this.checkIfOpenToday("food");
    }

    this.checkBedAvailability();
  }

  checkBedAvailability() {
    if (this.org.services.beds) {
      this.bedString = "Beds Available Now";
    }
  }

  async checkIfOpenToday(inputService: string) {
    let service;
    const day = this.dayTime.dayOfWeek;

    if (inputService === "HOP") {
      service = this.org.hoursOfOperation;
      if (service[day].isClosed) {
        this.setasClosed("HOP");
        return;
      }
    } else if (inputService === "food") {
      service = this.org.hoursServingFood;
      if (service[day].isClosed) {
        this.setasClosed("food");
        return;
      }
    }

    const openTime = await this.extractTimeOfService(service[day].open);
    const closeTime = await this.extractTimeOfService(service[day].close);

    this.checkIfNow(openTime, closeTime, service);
  }

  checkIfNow(openTime, closeTime, service) {
    let serviceString;
    let tempOpenHour;
    let tempCloseHour;
    let tempDayHour;

    if (service === this.org.hoursOfOperation) {
      serviceString = "HOP";
    } else if (service === this.org.hoursServingFood) {
      serviceString = "food";
    }

    if (openTime.meridiem === 1) {
      if (openTime.hour === 12) {
        tempOpenHour = openTime.hour;
      } else {
        tempOpenHour = openTime.hour + 12;
      }
    } else {
      tempOpenHour = openTime.hour;
    }

    if (closeTime.meridiem === 1) {
      if (closeTime.hour === 12) {
        tempCloseHour = closeTime.hour;
      } else {
        tempCloseHour = closeTime.hour + 12;
      }
    } else {
      tempCloseHour = closeTime.hour;
    }

    if (this.dayTime.meridiem === 1) {
      if (this.dayTime.hour == 12) {
        tempDayHour = this.dayTime.hour;
      } else {
        tempDayHour = this.dayTime.hour + 12;
      }
    } else {
      tempDayHour = this.dayTime.hour;
    }

    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~
    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~
    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~

    // console.log('Now Hour' , tempDayHour);
    // console.log("Now Minute", this.dayTime.minute);
    // console.log('Open Hour' , tempOpenHour);
    // console.log('Open Min' , openTime.minute);
    // console.log('Close Min' , closeTime.minute);
    // console.log('Close Hour' , tempCloseHour);

    if ( tempDayHour >= tempOpenHour ) {
      
      if ( tempDayHour > tempCloseHour ) {
        this.setasClosed(serviceString)
        return
      }
      // -~-~-~ Current Hour is same as Open Hour - Check Minutes -~-~-~
      if ( tempDayHour === tempOpenHour ) {
        if ( this.dayTime.minute >= openTime.minute ) {
          this.setAsOpen(service)
          return
        } 
        if ( this.dayTime.minute < openTime.minute ) {
          this.setasClosed(serviceString)
          return
        } 
      }
      
      // -~-~-~ Current Hour is same as Close Hour - Check Minutes -~-~-~
      if ( tempDayHour === tempCloseHour ) {
        if( this.dayTime.minute >= closeTime.minute ) {
          this.setasClosed(serviceString)
          return
        }
        if ( this.dayTime.minute < closeTime.minute ) {
          this.setAsOpen(service)
          return
        }
      }
    
      this.setAsOpen(service)
    
    } 
  }
    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~
    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~
    // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~

  setAsOpen(service) {
    if (service === this.org.hoursOfOperation) {
      this.hoursOfOpString = "Open Now";
      this.hoursOfOpContext = "until " + service[this.dayTime.dayOfWeek].close;
      this.hoursOfOpOpen = true;
    } else if (service === this.org.hoursServingFood) {
      this.hoursServingFoodString = "Serving Food";
      this.hoursServingFoodContext =
        "until " + service[this.dayTime.dayOfWeek].close;
      this.hoursServingFoodNow = true;
    }
  }

  setasClosed(service) {
    let nextOpenDay = this.nextOpen(service);

    if (service === "HOP") {
      this.hoursOfOpString = "Closed";
      this.hoursOfOpContext =
        "open " + this.days[nextOpenDay[1]] + " at " + nextOpenDay[0];
      this.hoursOfOpOpen = false;
    } else if (service === "food") {
      this.hoursServingFoodString = "Serving Food ";
      this.hoursServingFoodContext =
        this.days[nextOpenDay[1]] + " at " + nextOpenDay[0];
      this.hoursServingFoodNow = false;
    }
  }

  nextOpen(type) {
    let service;
    const day = this.dayTime.dayOfWeek;

    if (type === "HOP") {
      service = this.org.hoursOfOperation;
    } else if (type == "food") {
      service = this.org.hoursServingFood;
    }

    let temp = 0;
    for (let index = 0; index < 9; index++) {
      if (day + index >= 7) {
        if (service[temp].isClosed) {
        } else {
          return [service[temp].open, temp];
        }
        temp += 1;
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
