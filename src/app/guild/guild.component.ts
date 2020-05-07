import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';
import {FormBuilder} from '@angular/forms';

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
    this.webSocketAPI._send(message);
  }

}
