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

  constructor(private clickFunction: ClickFunctionsService) {}

  ngOnInit() {
    this.createAddress();

    // this.getTimeOfService(this.org.hoursOfOperation[1].close);
    this.checkIfOpenToday();
  }

  checkIfOpenToday() {
    // console.log(this.org.hoursOfOperation[this.dayTime.dayOfWeek]);

    if (this.org.hoursOfOperation[this.dayTime.dayOfWeek].isClosed) {
      this.setHOPasClosed();
    } else {
      let openTime = this.extractTimeOfService(
        this.org.hoursOfOperation[this.dayTime.dayOfWeek].open
      );
      let closeTime = this.extractTimeOfService(
        this.org.hoursOfOperation[this.dayTime.dayOfWeek].open
      );
      this.checkIfOpenNow(openTime, closeTime);
    }
  }

  checkIfOpenNow(openTime, closeTime) {
    // console.log("toCheck Open Time", openTime);
    // console.log('today', this.dayTime.meridiem);

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
          this.setHOPasClosed();
        }
      } else {
        // console.log("Closed because of hour");
        this.setHOPasClosed();
      }
    } else {
      // console.log("Meridiem Check Closed");
      this.setHOPasClosed();
    }
  }

  setHOPasClosed() {
    // !! Build Function to check for next Day/Time open
    this.nextOpen();

    let nextTimeOpen = "";

    this.hoursOfOpString = "Closed";
    this.hoursOfOpContext = "opens at " + nextTimeOpen;
    this.hoursOfOpOpen = false;
  }


  nextOpen(){
    let day = this.dayTime.dayOfWeek;
    const dayHolder = day;

    for (let index = 0; index < 8; index++) {
      
      
    }


    if( this.org.hoursOfOperation[day+1].isClosed){
      console.log('Closed Tomorrow');
      
    } else {
      console.log('Open Tomorrow at ', this.org.hoursOfOperation[day+1].open);
      
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
