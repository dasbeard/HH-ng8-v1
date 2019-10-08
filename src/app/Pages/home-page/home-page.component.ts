import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/Services/geolocation.service";
import { OrganizationsService } from "src/app/Services/organizations.service";

interface geoLocation {
  lat: number;
  lng: number;
  zoom: number;
};


@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  location: geoLocation ={
    lat: 34.05,
    lng: -118.25,
    zoom: 9,
  }
  
  currentDate;

  allOrgs;

  constructor(
    private geoService: GeolocationService,
    private orgService: OrganizationsService
  ) {}

  ngOnInit() {
    this.runGeoLocation();
    this.getAllOrgs();
    this.getCurrentTime();
  }

  runGeoLocation() {
    if (this.geoService.userLocation) {
      // console.log("Geoloaction Already Stored");
      this.location.lat = this.geoService.userLocation.latitude;
      this.location.lng = this.geoService.userLocation.longitude;
      this.location.zoom = 15;
    } else {
      // console.log("No GeoLocation Stored");

      this.geoService.getUserLocation().subscribe(data => {
        // Save data in service for future uses
        this.geoService.userLocation = data;

        this.location.lat = data.latitude;
        this.location.lng = data.longitude;
        this.location.zoom = 15;
      });
    }
  }

  getAllOrgs() {
    this.orgService.getAllOrgs().subscribe(data => {
      this.allOrgs = data;
    });
  }

  getCurrentTime() {
    this.currentDate = new Date();

    // console.log(this.currentDate.get);
    console.log('day', this.currentDate.getDay());
    
  }

}
