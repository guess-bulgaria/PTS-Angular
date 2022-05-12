import { Component, OnInit } from '@angular/core';
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

}
