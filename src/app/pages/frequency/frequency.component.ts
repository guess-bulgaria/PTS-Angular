import { Component } from '@angular/core';
import { BasePage } from "../base-page";

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html'
})
export class FrequencyComponent extends BasePage {

  constructor() {
    super();
  }

  rows: any[] = [];

  totalAmount = 0;
  totalFrequency = 0;

  ngOnInit() {
    let data: Map<number, any> = new Map();
    for (let value of this.studentsData.values()) {
      let entry = data.get(value.uploadedFiles) || {uploadedFiles: value.uploadedFiles, amount: 0, frequency: 0};

      entry.amount += 1;
      this.totalAmount += 1;
      data.set(value.uploadedFiles, entry)
    }
    for (let value of data.values()) {
      value.frequency = value.amount / this.totalAmount * 100;
      this.totalFrequency += value.frequency;
      this.rows.push(value);
    }
  }
}
