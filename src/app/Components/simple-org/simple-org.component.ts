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

    // this.getTimeOfService(this.org.hoursOfOperation[1].close);
    this.checkIfOpenToday('HOP');
    if (this.org.services.servesFood){
      this.checkIfOpenToday('food');
    }
  }

  checkIfOpenToday(service) {

    console.log(service);

    // !! NEED TO MAKE THIS WORK FOR SERVING FOOD !!

    
    
    if (this.org.hoursOfOperation[this.dayTime.dayOfWeek].isClosed) {
      this.setasClosed('hoursOfOperation');
    } else {
      let openTime = this.extractTimeOfService(
        this.org.hoursOfOperation[this.dayTime.dayOfWeek].open
      );
      let closeTime = this.extractTimeOfService(
        this.org.hoursOfOperation[this.dayTime.dayOfWeek].open
      );
      this.checkIfNow(openTime, closeTime);
    }
  }

  checkIfNow(openTime, closeTime) {
    // console.log("Check meridiem");
    if (this.dayTime.meridiem >= openTime.meridiem) {
      // console.log("Checking Hour");
      if (
        this.dayTime.hour >= openTime.hour &&
        this.dayTime.hour <= closeTime.hour
      ) {
        // console.log("Check minutes");
        if (
          this.dayTime.minute >= openTime.minute &&
          this.dayTime.minute <= closeTime.minute
        ) {
          // console.log("open");
          this.hoursOfOpString = "Open Now";
          this.hoursOfOpContext =
            "until " + this.org.hoursOfOperation[this.dayTime.dayOfWeek].close;
          this.hoursOfOpOpen = true;
        } else {
          // console.log("Closed based on minute");
          this.setasClosed('hoursOfOperation');
        }
      } else {
        // console.log("Closed because of hour");
        this.setasClosed('hoursOfOperation');
      }
    } else {
      // console.log("Meridiem Check Closed");
      this.setasClosed('hoursOfOperation');
    }
  }

  setasClosed(service) {
    // !! Build Function to check for next Day/Time open
    let nextOpenDay = this.nextOpen(service);

    this.hoursOfOpString = "Closed";
    this.hoursOfOpContext = "open "+ this.days[nextOpenDay[1]] + ' at ' + nextOpenDay[0];
    this.hoursOfOpOpen = false;
  }

  nextOpen(type) {
    let service;
    if(type === 'hoursOfOperation'){
      service = this.org.hoursOfOperation; 
    } else if ( type == 'servingFood') {
      service = this.org.hoursServingFood;
    }

    // const tempService = type;
    // const service = 'this.org.'+ tempService;
    const day = this.dayTime.dayOfWeek;

    for (let index = 1; index < 9; index++) {
      if (day + index >= 7) {
        let temp = 0;
        if (service[temp].isClosed) {
          // console.log("Closed Tomorrow");
        } else {
          // console.log( "Open on " + temp + " at ", service[temp].open );
          return [service[temp].open, temp];
        }
        temp++;
      } else {
        if (service[day + index].isClosed) {
          // console.log("Closed Tomorrow");
        } else {
          // console.log( "Open on " + (day+index) + " at ", service[day + index].open );
          return [service[day + index].open, day + index];
        }
      }
    }
  }

  extractTimeOfService(time: string) {
    // console.log(time);
    let meridiemSplit = time.split(" ")[1];
    let meridiem;

    if (meridiemSplit === "AM") {
      // console.log('AM');
      meridiem = 0;
    } else if (meridiemSplit === "PM") {
      // console.log('PM');
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
