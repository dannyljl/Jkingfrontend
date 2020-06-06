import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GuildService} from '../services/guild.service';
import {Guild} from '../model/Guild';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-visit-guild',
  templateUrl: './visit-guild.component.html',
  styleUrls: ['./visit-guild.component.css']
})
export class VisitGuildComponent implements OnInit {

  guild: Guild;
  constructor(
    private route: ActivatedRoute,
    private guildservice: GuildService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.guildservice.getGuild(params.get('findguild'))
        .pipe(first())
        .subscribe(
          data => { this.guild = data;
          });
    });
  }

}
