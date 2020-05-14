import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuildComponent} from './guild/guild.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LogoutComponent} from './logout/logout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'guild',
    pathMatch: 'full'
  },
  {
    path: 'guild',
    component: GuildComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
