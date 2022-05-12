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
}
