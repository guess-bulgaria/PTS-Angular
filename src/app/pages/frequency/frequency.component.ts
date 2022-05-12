import { Component, OnInit } from '@angular/core';
import { BasePage } from "../base-page";

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent extends BasePage {
  constructor() {
    super();
  }
}
