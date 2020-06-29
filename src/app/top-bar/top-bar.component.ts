import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  user: User;

  constructor(public authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue != null){
      this.user = authenticationService.currentUserValue;
    }
  }

   ngOnInit(): void {
    if (this.authenticationService.currentUserValue != null){
      this.user = this.authenticationService.currentUserValue;
    }
  }
}
