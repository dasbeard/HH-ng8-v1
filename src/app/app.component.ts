import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Helping Hours';
  user$:User = <User>{};

  constructor( private auth: AuthService) {
    this.auth.user$.subscribe( user => {
      this.user$ = user;
    })
  }

  signOut(){
    this.auth.signOut();
  }
}
