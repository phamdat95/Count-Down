import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnChanges {
  private interValid: number;
  message = '';
  remainTime: number;
  @Input(`remainTime`)
  time: number;
  constructor() { }

  ngOnInit() {
    this.restart();
    this.start();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('time' in changes) {
      let time = changes.time.currentValue;
      time = typeof time === 'undefined' ? 11 : time;
      this.time = time;
    }
  }
  restart () {
    this.message = 'Click start button to start';
    this.remainTime = this.time;
    this.clearTime();
  }
  clearTime () {
    clearInterval(this.interValid);
  }
  countTime () {
    this.interValid = window.setInterval(() => {
      if (this.remainTime > 0) {
        this.remainTime --;
        this.message = `${this.remainTime} second and counting`;
      } else {
        this.clearTime();
        this.message = 'Blast off';
      }
    }, 1000);
  }
  start () {
    this.countTime();
  }
  stop () {
    this.clearTime();
    this.message = `Holding at ${this.remainTime} seconds`;
  }
}
