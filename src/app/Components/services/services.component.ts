import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Services } from 'src/app/Models/user';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnChanges {
  
  // @Input() services: object;
  @Input() services: Services;
  @Input() bedCount: number;
  
  bedVariable: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }
  
  ngOnChanges(){
    if( this.services.beds ){
      this.bedVariable = true;
    }
    
  }


}
