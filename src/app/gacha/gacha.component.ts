import { Component, OnInit } from '@angular/core';
import {GachaService} from '../gacha.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {GachaNumber} from '../model/GachaNumber';

@Component({
  selector: 'app-gacha',
  templateUrl: './gacha.component.html',
  styleUrls: ['./gacha.component.css']
})
export class GachaComponent implements OnInit {

  gachaNumber: number;
  gachaForm: FormGroup;

  constructor(private gachaService: GachaService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.gachaForm = this.formBuilder.group({
      maxNumber: ['', Validators.required],
    });
  }

  onDraw(maxNumber: GachaNumber){
    console.log('maxnumber=' + maxNumber.maxNumber);
    this.gachaService.getResult(maxNumber.maxNumber).pipe(first()).subscribe(
      data => this.gachaNumber = data);
  }


}
