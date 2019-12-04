import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/Services/geolocation.service";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { AgmInfoWindow } from "@agm/core";
import { ClickFunctionsService } from 'src/app/Services/click-functions.service';

interface geoLocation {
  lat: number;
  lng: number;
  zoom: number;
}

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  userLocation: geoLocation = {
    lat: 34.05,
    lng: -118.25,
    zoom: 9
  };

  radiusSize: number = null;
  currentDateTime;
  allOrgs;
  dayObj;

  // !! NEED TO GET FIRST 3 ORGS
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;

  constructor(
    private geoService: GeolocationService,
    private orgService: OrganizationsService,
    private clickFunction: ClickFunctionsService
  ) {
    this.currentIW = null;
    this.previousIW = null;
  }

  ngOnInit() {
    this.runGeoLocation();

    this.getAllOrgs();
    this.getCurrentTime();
  }

  
  runGeoLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.userLocation.lng = position.coords.longitude;
          this.userLocation.lat = position.coords.latitude;
          this.userLocation.zoom = 14;        },
        error => {
          this.runIPAPI(error);
        }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        this.runIPAPI('Geolocation is not supported by this browser');
    }
  }

  runIPAPI(err) {
    // console.log('Running IPAPI');

    if (this.geoService.userIpapiLocation) {
      // console.log("Geoloaction Already Stored");
      this.userLocation.lat = this.geoService.userIpapiLocation.latitude;
      this.userLocation.lng = this.geoService.userIpapiLocation.longitude;
      this.userLocation.zoom = 13;
    } else {
      // console.log("No GeoLocation Stored");

      this.geoService.getUserLocation().subscribe(data => {
        // Save data in service for future uses
        this.geoService.userIpapiLocation = data;

        this.userLocation.lat = data.latitude;
        this.userLocation.lng = data.longitude;
        this.userLocation.zoom = 13;
      });
    }
  }

  getAllOrgs() {
    this.orgService.getAllOrgs().subscribe(data => {
      this.allOrgs = data;

      // console.log(this.allOrgs);
    });
  }

  // mapClick() {
  //   if (this.previousIW) {
  //     this.previousIW.close();
  //   }
  // }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }

  visitWebsite(URL: string) {
    this.clickFunction.visitWebsite(URL);
  }

  openAddressinGoogleMaps(address: string) {
    this.clickFunction.openAddressInGoogleMaps(address)
  }


  getCurrentTime() {
    this.currentDateTime = new Date();
    let hour = this.currentDateTime.getHours();
    let min = this.currentDateTime.getMinutes();
    let meridiem = 0;
    let day = this.currentDateTime.getDay();
    
    if (hour > 12) {
      hour -= 12;
      meridiem = 1;
      // console.log(hour);
    }

    this.dayObj = {
                  dayOfWeek: day,
                  hour: hour,
                  minute: min,
                  meridiem: meridiem
                };

    // console.log(this.dayObj);
    




    // !! Get hour and min into string to be able to compare agains hours of Op and Serving Times
    // .toString()
    // let temp = parseInt(text, 10) // Example

    // console.log(this.currentDateTime);
    // console.log("day", this.currentDateTime.getDay());
  }
}
