import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { GuildComponent } from './guild.component';
import {OnInit} from '@angular/core';

export class WebSocketAPI{
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  public messages: any = [];
  guildcomponent: GuildComponent;
  constructor(appComponent: GuildComponent){
    this.guildcomponent = appComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    // tslint:disable-next-line:only-arrow-functions
    _this.stompClient.connect({}, function(frame) {
      // tslint:disable-next-line:only-arrow-functions
      _this.stompClient.subscribe(_this.topic, (message) => {
        if (message.body) {
          console.log(message.body);
          _this.messages.push(message.body);
        }
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }
}
