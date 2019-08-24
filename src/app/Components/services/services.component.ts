import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  checked1;
  checked2:boolean = true;
  checked3:boolean = false;
  checked4:boolean = false;
  checked5:boolean = true;
  checked6:boolean = false;
  checked7:boolean = true;
  
  
  constructor() { }

  ngOnInit() {
  }

}
