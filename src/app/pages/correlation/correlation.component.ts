import { Component } from '@angular/core';
import { BasePage } from "../base-page";
import { CalculationHelper } from "../../helpers/calculation.helper";

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent extends BasePage {
  constructor() {
    super();
  }

  correlationValue?: number;
  correlationDependence?: string;

  ngOnInit() {
    const students = [...this.studentsData.values()];
    const numbers = students.map(student => student.lecturesViewed.length);
    if (!numbers.length) return;

    let data: Map<number, number> = new Map();
    for (const lecturesViewed of numbers)
      data.set(lecturesViewed, (data.get(lecturesViewed) || 0) + 1)

    let x: number[] = [];
    let y: number[] = [];
    for (let student of students) {
      if (student.grade === undefined) continue;
      x.push(student.grade);
      y.push(data.get(student.lecturesViewed.length)! );
    }

    this.correlationValue = CalculationHelper.calculateCorrelations(x, y);
    this.correlationDependence = this.getDependence(this.correlationValue);
  }

  getDependence(i: number): string {
    i = Math.abs(i)
    if (i == 0) return 'липсва';
    else if (i < 0.3) return 'слаба'
    else if (i < 0.5) return 'умерена'
    else if (i < 0.7) return 'значителна'
    else if (i < 0.9) return 'силна'
    else if (i == 1) return 'функционална'
    return 'много силна'
  }

}
