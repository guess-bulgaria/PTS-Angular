import { Component } from '@angular/core';
import { BasePage } from "../base-page";
import { CalculationHelper } from "../../helpers/calculation.helper";

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html'
})
export class TrendComponent extends BasePage {
  constructor() {
    super();
  }

  avg?: number;
  median?: number;
  mode?: number[];

  ngOnInit() {
    let numbers = ([...this.studentsData.values()])
      .map(student => student.uploadedFiles)
      .sort((a, b) => a - b);
    if (numbers.length == 0) return;

    this.mode = CalculationHelper.findMode(numbers);
    this.median = CalculationHelper.findMedian(numbers);
    this.avg = CalculationHelper.findAvg(numbers);
  }

  joinArr(arr: any[]) {
    return arr.join(',');
  }
}
