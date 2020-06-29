import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {User} from '../model/User';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = null;
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loading = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  DeleteAccount(){
    this.authenticationService.delete(this.authenticationService.currentUserValue.id);
  }

  onSubmit() {

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    console.log(this.updateForm.value);
    this.user = this.updateForm.value;
    this.user.id = this.authenticationService.currentUserValue.id;
    this.authenticationService.update(this.user)
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
