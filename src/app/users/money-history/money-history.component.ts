import { Chart } from 'chart.js';
import { UserService } from '../../user.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MoneyHistoryModel } from '../../models/money-history.model';

@Component({
  selector: 'pr-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') canvas: ElementRef<any>;
  money: Array<number> = [];
  instant: Array<string> = [];
  moneyChart: Chart;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService.getMoneyHistory()
    .subscribe(
      moneyHistory => {
        moneyHistory.map((event: MoneyHistoryModel) => {
          this.moneyChart = new Chart(
            this.canvas.nativeElement,
            {
              type: 'line',
              data: {
                labels: this.instant,
                datasets: [{
                  label: 'Money History',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  data: this.money
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    type: 'time'
                  }]
                }
              }
            }
          );
          this.money.push(event.money);
          this.instant.push(event.instant);
          this.moneyChart.update();
        });
      }
    );
  }
}
