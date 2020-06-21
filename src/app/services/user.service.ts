import {User} from '../model/User';

﻿import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.authUrl}/users`, httpOptions);
  }

  register(user: User) {
    return this.http.post(`${environment.authUrl}/users/sign-up`, user, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${environment.authUrl}/users/${id}`, httpOptions);
  }
}
