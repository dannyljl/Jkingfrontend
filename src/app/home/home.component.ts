import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {User} from '../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    this.user = this.registerForm.value;
    this.user.id = this.authenticationService.currentUserValue.id;
    this.userService.register(this.user)
      .pipe(first())
      .subscribe(
        data => {this.user = data;
          // this.alertService.success('Registration successful', true);
        },
        error => {
          // this.alertService.error(error);
        });
  }

}
