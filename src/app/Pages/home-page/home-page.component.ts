import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/Services/geolocation.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  lat: number = 34.05;
  lng: number = -118.25;
  zoom: number = 9;

  constructor(private geoService: GeolocationService) {}

  ngOnInit() {
    if (this.geoService.userLocation) {
      // console.log("Geoloaction Already Stored");
      this.lat = this.geoService.userLocation.latitude;
      this.lng = this.geoService.userLocation.longitude;
      this.zoom = 15;
    } else {
      // console.log("No GeoLocation Stored");

      this.geoService.getUserLocation().subscribe(data => {
        // console.log(data);
        // console.log("IPAPI is running");

        // Save data in service for future uses
        this.geoService.userLocation = data;

        this.lat = data.latitude;
        this.lng = data.longitude;
        this.zoom = 15;

      });
    }
  }
}
