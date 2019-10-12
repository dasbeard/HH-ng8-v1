import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/Services/geolocation.service";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { AgmInfoWindow } from "@agm/core";

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
  currentDate;
  allOrgs;

  // !! NEED TO GET FIRST 3 ORGS
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;

  constructor(
    private geoService: GeolocationService,
    private orgService: OrganizationsService
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

  mapClick() {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }

  visitWebsite(URL: string) {
    window.open(URL, "_blank");
  }

  openAddressinGoogleMaps(URL: string) {
    const baseURL = "https://www.google.com/maps/dir/?api=1&destination=";
    const urlEncoded = encodeURI(URL);
    const fullURL = baseURL + urlEncoded;

    window.open(fullURL, "_blank");
  }

  getCurrentTime() {
    this.currentDate = new Date();

    // console.log(this.currentDate.get);
    // console.log("day", this.currentDate.getDay());
  }
}
