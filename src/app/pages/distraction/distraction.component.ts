import { Component } from '@angular/core';
import { BasePage } from "../base-page";
import { CalculationHelper } from "../../helpers/calculation.helper";

@Component({
  selector: 'app-distraction',
  templateUrl: './distraction.component.html',
  styleUrls: ['./distraction.component.css']
})
export class DistractionComponent extends BasePage {
  constructor() {
    super();
  }

  scope?: number = 0;
  variance?: number = 0;
  standardDeviation?: number = 0;

  ngOnInit() {
    let numbers = ([...this.studentsData.values()])
      .map(student => student.uploadedFiles)
      .sort((a, b) => a - b);
    if (numbers.length == 0) return;

    this.scope = CalculationHelper.findScope(numbers);
    this.variance = CalculationHelper.calculateVariance(numbers);
    this.standardDeviation = CalculationHelper.calculateSD(this.variance);
  }

}
