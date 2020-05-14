import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';
import {FormBuilder} from '@angular/forms';
import {HelloMessage} from '../model/HelloMessage';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],
})
export class GuildComponent implements OnInit {
  title = 'angular9-springboot-websocket';
  webSocketAPI: WebSocketAPI;
  chatForm;

  constructor(private formBuilder: FormBuilder) {this.chatForm = this.formBuilder.group({
    message: ''}); }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new GuildComponent(this.formBuilder));
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

}
