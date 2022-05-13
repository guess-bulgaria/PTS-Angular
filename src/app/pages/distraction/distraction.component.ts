import { Component } from '@angular/core';
import { BasePage } from "../base-page";

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

    this.scope = this.findScope(numbers);
    this.variance = this.calculateVariance(numbers);
    this.standardDeviation = this.calculateSD(this.variance);
  }

  findScope(array: number[]): number {
    return array[array.length-1] - array[0];
  }

  calculateVariance (array: number[]) {
    const average = this.calculateMean(array);

    const squareDiffs = array.map((value) => {
      const diff = value - average;
      return diff * diff;
    });
    return this.calculateMean(squareDiffs);
  };

  calculateMean (array: number[]) {
    return (array.reduce((sum, current) => sum + current)) / array.length;
  };

  calculateSD (variance: number) {
    return Math.sqrt(variance);
  };

}
