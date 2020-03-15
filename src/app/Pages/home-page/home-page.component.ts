import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/Services/geolocation.service";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { AgmInfoWindow } from "@agm/core";
import { ClickFunctionsService } from 'src/app/Services/click-functions.service';

// GeoFireX
import * as firebaseApp from 'firebase/app';
import * as geofirex from 'geofirex';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

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
  geo = geofirex.init(firebaseApp);

  userLocation: geoLocation = {
    lat: 34.05,
    lng: -118.25,
    zoom: 9
  }; 


  showRadius: Boolean = false;
  newLatLng: Object = {lat: this.userLocation.lat, lng: this.userLocation.lng};

  points: Observable<any>;
  radius = new BehaviorSubject(12);

  // radiusSize: number = null;
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

    // this.getAllOrgs();
    this.getNearbyOrgs();
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

  getNearbyOrgs(){
    let center = this.geo.point(this.userLocation.lat, this.userLocation.lng);
    let field = 'pos';

    this.points = this.radius.pipe(
      switchMap(r => {
        // return this.geo.query('/users').within(center, r, field);
        return this.geo.query('/users').within(center, r, field, { log: true });
      }),
      shareReplay(1)
    );
  }


  setRadius(zoomLevel: Number){
    let rad;
    if(zoomLevel <= 11){
      rad = 18;
      this.showRadius = true;
    } else if (zoomLevel == 12){
      rad = 12;
      this.showRadius = false;
    } else if (zoomLevel == 13){
      rad = 6;
      this.showRadius = false;
    } else if (zoomLevel == 14){
      rad = 2;
      this.showRadius = false;
    } else if (zoomLevel == 15){
      rad = 1
      this.showRadius = false;
    } else if (zoomLevel >= 16){
      rad = .75
      this.showRadius = false;
    }
    console.log(this.showRadius);
    
    return rad;
  }
  
  zoomChange(e){
    this.radius.next(this.setRadius(e));
    console.log(this.radius.value);
    
  }

  // getAllOrgs() {
  //   this.orgService.getAllOrgs().subscribe(data => {
  //     if(data){

  //       data.forEach( org => {
  //         org.tempPhoto = this.orgService.getOrgImage(org.photoName);
  //       })
  //       this.allOrgs = data;
  //     }
  //   });
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



  // mapClick() {
  //   if (this.previousIW) {
  //     this.previousIW.close();
  //   }
  // }

}
