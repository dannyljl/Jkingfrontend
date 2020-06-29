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
import {placeholdersToParams} from '@angular/compiler/src/render3/view/i18n/util';

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
      this.findGuildForm = this.formBuilder.group({findguild: ''});
      this.chatForm = this.formBuilder.group({message: ''});
  }

  async ngOnInit() {
    let shouldbeGuild = null;
    this.route.paramMap.subscribe(params => {
        this.guildservice.getGuild(params.get('guildName'))
          .pipe(first())
          .subscribe(
            data => { shouldbeGuild = data;
            });
      });
    await this.delay(500);
    if (shouldbeGuild != null){
        this.guild = shouldbeGuild;
        this.webSocketAPI = new WebSocketAPI(this, this.authenticationService);
        this.connect();
      }
    if (shouldbeGuild == null){
      window.alert('please join or create a guild');
    }
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

  joinGuild(){
    this.guildservice.joinGuild(this.authenticationService.currentUserValue.id, this.guild.name).pipe().subscribe( data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.authenticationService.updatelocal();
    });
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
