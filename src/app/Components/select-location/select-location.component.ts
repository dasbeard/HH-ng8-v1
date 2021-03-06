import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  Location,
  Appearance
} from "@angular-material-extensions/google-maps-autocomplete";
// import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { GeolocationService } from "src/app/Services/geolocation.service";
import { Ipapi } from "src/app/Models/ipapi.model";
import { AuthService } from "src/app/Services/auth.service";
import { RegistationService } from "src/app/Services/registation.service";
import { LatLngPosition, User } from "src/app/Models/user";

export interface changeAddress {
  identifier: string, 
  user: User;
}

@Component({
  selector: "app-select-location",
  templateUrl: "./select-location.component.html",
  styleUrls: ["./select-location.component.scss"]
  // encapsulation: ViewEncapsulation.None
})
export class SelectLocationComponent implements OnInit {
  public appearance = Appearance;
  public selectedAddress: PlaceResult;
  public country: string;
  public orgResult: PlaceResult;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public userLocation: Ipapi;
  latLng: LatLngPosition;

 
  headerString: string = 'What is your address?';
   @Input() oldAddress: changeAddress;
   @Output() savedNewAddress = new EventEmitter();

  constructor(
    // private titleService: Title,
    private geoLocate: GeolocationService,
    private regService: RegistationService
  ) {
    // console.log('in Select place');
    
  }
  
  ngOnInit() {
    // this.titleService.setTitle(
      //   "Home | @angular-material-extensions/google-maps-autocomplete"
      // );

    if(this.oldAddress) {
      this.zoom = 17;
      this.latitude = this.oldAddress.user.latLng.latitude;
      this.longitude = this.oldAddress.user.latLng.longitude;
      this.country = "us";
      this.headerString = 'Whats your new address?';
    } else {
      this.zoom = 10;
      this.latitude = 34.05;
      this.longitude = -118.25;
      this.country = "us";
      
      this.runGeoLocation();
    }
  }

  runGeoLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.zoom = 14;        },
        error => {
          this.runIPAPI(error);
        }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        this.runIPAPI('Geolocation is not supported by this browser');
    }
  }

  runIPAPI(message:any) {
 
    if (this.geoLocate.userIpapiLocation) {
      this.userLocation = this.geoLocate.userIpapiLocation;
      this.latitude = this.userLocation.latitude;
      this.longitude = this.userLocation.longitude;
      this.zoom = 14;
    } else {
      this.geoLocate.getUserLocation().subscribe(data => {
        //       // Save data in service for future uses
        this.geoLocate.userIpapiLocation = data;

        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.zoom = 14;
      });
    }

  }

  onAutocompleteSelected(result: PlaceResult) {
    // console.log("onAutocompleteSelected: ", result);
    this.orgResult = result;
  }

  onLocationSelected(location: Location) {
    // console.log("onLocationSelected: ", location);
    this.latLng = location;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.zoom = 18;
  }

  moveForward() {
    // console.log(this.orgResult);
    // console.log(this.regService.newUser);
    // this.latLng.longitude = this.longitude;
    if (this.oldAddress){
      // console.log('Updating Address');
      
      // console.log(this.orgResult, this.latLng, this.oldAddress.uid);
      
      this.regService.updateAddress(this.orgResult, this.latLng, this.oldAddress.user);
      this.savedNewAddress.emit('addressUpdated');
      

    } else {
      // console.log('Registering New Account');
      
      this.regService.buildUserLocation(this.orgResult, this.latLng);
    }

  }
}
