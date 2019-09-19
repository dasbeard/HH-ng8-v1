import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/user';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-simple-org',
  templateUrl: './simple-org.component.html',
  styleUrls: ['./simple-org.component.scss']
})
export class SimpleOrgComponent implements OnInit {
  @Input() org: User;

  timeNow;

  constructor() { }

  ngOnInit() {
    // console.log(this.org);
  }

}
