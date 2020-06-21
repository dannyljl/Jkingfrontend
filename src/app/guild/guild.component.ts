import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';
import {FormBuilder} from '@angular/forms';
import {HelloMessage} from '../model/HelloMessage';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/User';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {GuildService} from '../services/guild.service';
import {Guild} from '../model/Guild';

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
  guild: Guild;
  loading = false;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private guildservice: GuildService) {
      this.findGuildForm = this.formBuilder.group({findguild: ''}),
      this.chatForm = this.formBuilder.group({message: ''});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.guildservice.getGuild(params.get('guildName'))
        .pipe(first())
        .subscribe(
          data => { this.guild = data;
          });
    });
    this.webSocketAPI = new WebSocketAPI(this, this.authenticationService);
    this.connect();
    this.loading = true;
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
    const user = this.authenticationService.currentUserValue;
    helloMessage.messageOwner = user;
    this.webSocketAPI._send(helloMessage);
  }

  findGuildByName(findguild){
    console.log(findguild);
    this.router.navigate(['/guild/' + findguild.findguild]);
    this.ngOnInit();
  }

}
