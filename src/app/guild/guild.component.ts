import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';
import {FormBuilder} from '@angular/forms';
import {HelloMessage} from '../model/HelloMessage';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/User';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],
})
export class GuildComponent implements OnInit {
  title = 'angular9-springboot-websocket';
  webSocketAPI: WebSocketAPI;
  chatForm;
  findGuildForm;


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
      this.findGuildForm = this.formBuilder.group({findguild: ''}),
      this.chatForm = this.formBuilder.group({message: ''});
  }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new GuildComponent(this.formBuilder, this.router, this.authenticationService));
    this.connect();
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(message){
    const helloMessage = new HelloMessage();
    helloMessage.message = message;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    helloMessage.messageOwner = user;
    this.webSocketAPI._send(helloMessage);
  }

  findGuildByName(findguild){
    console.log(findguild.findguild);
    this.router.navigate(['/guild/' + findguild.findguild, findguild]);
  }

}
