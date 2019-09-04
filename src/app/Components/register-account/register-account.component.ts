import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  @Output() goToLogin = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.goToLogin.emit(true);
  }

}
