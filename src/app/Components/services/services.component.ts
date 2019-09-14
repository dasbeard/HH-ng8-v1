import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  @Input() services: object;

  constructor() { }

  ngOnInit() {
    // console.log( this.services );
  }

}
