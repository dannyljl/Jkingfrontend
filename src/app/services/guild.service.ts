import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/User';
import {Guild} from '../model/Guild';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, private router: Router) {
  }

  createGuild(guild: Guild) {
    return this.http.post<Guild>(`${environment.guildUrl}/guild`, guild, httpOptions);
  }

  getGuild(guildName: string){
    return this.http.get<Guild>(`${environment.guildUrl}/guild/` + guildName);
  }

  joinGuild(id: number, guildName: string){
    return this.http.post<User>(`${environment.guildUrl}/guild/` + guildName, id, httpOptions);
  }

  getUserGuild(id: number){
    return this.http.post<Guild>(`${environment.guildUrl}/guild/user`, id, httpOptions);
  }
}
