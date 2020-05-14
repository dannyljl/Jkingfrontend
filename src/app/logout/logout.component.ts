import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
