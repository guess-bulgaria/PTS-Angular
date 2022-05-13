import { Component } from '@angular/core';
import { BasePage } from "../base-page";

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
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

    this.mode = this.findMode(numbers);
    this.median = this.findMedian(numbers);
    this.avg = this.findAvg(numbers);
  }

  joinArr(arr: any[]) {
    return arr.join(',');
  }

  findAvg(arr: number[]): number {
    return arr.reduce((previousValue, currentValue) => previousValue + currentValue) / arr.length
  }

  findMedian(array: number[]): number {
    if (array.length % 2 == 0) {
      const midIndex = array.length / 2;
      return (array[midIndex] + array[midIndex + 1]) / 2;
    }

    return array[(array.length + 1) / 2];
  }

  findMode(array: number[]): number[] | undefined {
    if (array.length == 0)
      return undefined;
    let modeMap: Map<number, number> = new Map();
    let maxCount = 1;

    for (let i = 0; i < array.length; i++) {
      let el = array[i];
      let value = modeMap.get(el) || 0;
      modeMap.set(el, ++value);

      if (value && value > maxCount) maxCount = value;
    }

    let maxElements = [];
    for (let key of modeMap.keys())
      if (modeMap.get(key) == maxCount)
        maxElements.push(key);

    return maxElements;
  }
}
