import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Input() isBoosted: boolean;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl() {
    const basePath = 'assets/images/pony-';
    const ponyColor = this.ponyModel.color;
    const imagePath = basePath + ponyColor.toLowerCase();

    if (this.isBoosted) {
      return imagePath + '-rainbow.gif';
    } else if (this.isRunning) {
      return imagePath + '-running.gif';
    } else {
      return imagePath + '.gif';
    }
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}

