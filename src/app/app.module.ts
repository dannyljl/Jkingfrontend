import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuildComponent } from './guild/guild.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {TopBarComponent} from './top-bar/top-bar.component';
import {LogoutComponent} from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { CreateGuildComponent } from './create-guild/create-guild.component';
import { VisitGuildComponent } from './visit-guild/visit-guild.component';

@NgModule({
  declarations: [
    AppComponent,
    GuildComponent,
    LoginComponent,
    TopBarComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    CreateGuildComponent,
    VisitGuildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
