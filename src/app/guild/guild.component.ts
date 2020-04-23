import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  title = 'angular9-springboot-websocket';
  input;
  webSocketAPI: WebSocketAPI;
  greeting = [];
  name: string;

  get getGreeting(){
    return this.greeting;
  }

  set setGreeting(greeting){
    this.greeting = greeting;
  }
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new GuildComponent());
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.title = message;
    this.greeting.push(message);
    for(let msg in this.greeting){
      console.log(msg.toString());
    }
  }

}
