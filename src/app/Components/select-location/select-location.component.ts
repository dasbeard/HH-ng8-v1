import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Location,
  Appearance
} from "@angular-material-extensions/google-maps-autocomplete";
// import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { GeolocationService } from "src/app/Services/geolocation.service";
import { Ipapi } from "src/app/Models/ipapi.model";
import { AuthService } from "src/app/Services/auth.service";
import { RegistationService } from 'src/app/Services/registation.service';
import { LatLngPosition } from 'src/app/Models/user';

@Component({
  selector: "app-select-location",
  templateUrl: "./select-location.component.html",
  styleUrls: ["./select-location.component.scss"]
  // encapsulation: ViewEncapsulation.None
})
export class SelectLocationComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public country: string;
  public orgResult: PlaceResult;
  public userLocation: Ipapi;

  latLng:LatLngPosition;

  constructor(
    private titleService: Title,
    private geoLocate: GeolocationService,
    private regService: RegistationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      "Home | @angular-material-extensions/google-maps-autocomplete"
    );

    this.zoom = 10;
    this.latitude = 34.05;
    this.longitude = -118.25;
    this.country = "us";

    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    // console.log( this.geoLocate.userLocation );
    if (this.geoLocate.userLocation) {
      this.userLocation = this.geoLocate.userLocation;
      this.latitude = this.userLocation.latitude;
      this.longitude = this.userLocation.longitude;
      this.zoom = 15;
    } else {
      this.geoLocate.getUserLocation().subscribe(data => {
        // Save data in service for future uses
        this.geoLocate.userLocation = data;

        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.zoom = 15;
      });
    }

    // if (userLocation.latitude) {
    //   this.latitude = userLocation.latitude;
    //   this.longitude = userLocation.longitude;
    //   this.zoom = 15;
    //   // this.country = userLocation.country;
    // }
    // console.log(this.country);
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log("onAutocompleteSelected: ", result);
    this.orgResult = result;
  }

  onLocationSelected(location: Location) {
    console.log("onLocationSelected: ", location);
    this.latLng = location;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.zoom = 18;
  }

  moveForward() {
    // console.log(this.orgResult);
    // console.log(this.regService.newUser);
    // this.latLng.longitude = this.longitude;

    this.regService.buildUserLocation(this.orgResult, this.latLng);

    
  }
}
