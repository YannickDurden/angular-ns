import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl() {
    const basePath = 'assets/images/pony-';
    const ponyColor = this.ponyModel.color;
    const imagePath = basePath + ponyColor.toLowerCase();

    return this.isRunning
      ? imagePath + '-running.gif'
      : imagePath + '.gif';
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}

