import { Component, OnInit } from '@angular/core';
import { GeolocationServiceService } from 'src/app/Services/geolocation-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  lat:number;
  lng:number;
  zoom:number;

  constructor( private geoService: GeolocationServiceService ) { }

  ngOnInit() {
    this.geoService.getUserLocation().subscribe( data => {
      console.log(data);
      console.log('IPAPI is running');
      
      // Save data in service for future uses
      this.geoService.userLocation = data;

      this.lat = data.latitude;
      this.lng = data.longitude;
      this.zoom = 15;
      
      // if ipapi fails show map of Los Angeles
      if(this.lat == null){
        this.lat = 34.05;
        this.lng = -118.25;
        this.zoom = 9;
      } 
    })    
    
  }

}
