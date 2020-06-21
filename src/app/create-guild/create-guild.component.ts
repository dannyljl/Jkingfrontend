import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {GuildService} from '../services/guild.service';
import {Guild} from '../model/Guild';

@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  submitted = false;
  guild: Guild;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private guildService: GuildService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.guild = this.createForm.value;
    this.guild.leader = this.authenticationService.currentUserValue;
    this.loading = true;
    const user = this.authenticationService.currentUserValue;
    console.log(this.guild);
    this.guildService.createGuild(this.guild)
      .pipe(first())
      .subscribe(
        data => {
          user.guildId = data.id;
          user.guildName = data.name;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.authenticationService.updatelocal();
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/guild/' + this.guild.name]);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

}
