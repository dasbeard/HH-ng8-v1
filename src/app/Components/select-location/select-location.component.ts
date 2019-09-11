import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Location,
  Appearance
} from "@angular-material-extensions/google-maps-autocomplete";
// import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { GeolocationServiceService } from 'src/app/Services/geolocation-service.service';


@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectLocationComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public country: string;

  constructor(private titleService: Title, private geoLocate: GeolocationServiceService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 34.05;
    this.longitude = -118.25;
    this.country = 'us';

    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    // console.log( this.geoLocate.userLocation );
    const userLocation = this.geoLocate.userLocation;

    if (userLocation.latitude) {
      this.latitude = userLocation.latitude;
      this.longitude = userLocation.longitude;
      this.zoom = 15;
      // this.country = userLocation.country;
    }
    // console.log(this.country);

  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.zoom = 18;
  }
}
