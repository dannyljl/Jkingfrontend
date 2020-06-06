import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/User';
import {Guild} from '../model/Guild';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, private router: Router) {
  }

  createGuild(guild: Guild) {
    return this.http.post<Guild>('http://localhost:8081/guild', guild, httpOptions);
  }

  getGuild(guildName: string){
    return this.http.get<Guild>('http://localhost:8081/guild/' + guildName);
  }
}
