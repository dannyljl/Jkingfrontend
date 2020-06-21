import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Guild} from './model/Guild';

@Injectable({
  providedIn: 'root'
})
export class GachaService {

  constructor(private http: HttpClient) {
  }

  getResult(maxnumber: number){
    return this.http.get<number>('http://20.50.47.124:8081/gacha/' + maxnumber);
  }
}
