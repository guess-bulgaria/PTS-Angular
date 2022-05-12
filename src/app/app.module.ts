import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { FrequencyComponent } from './pages/frequency/frequency.component';
import { TrendComponent } from './pages/trend/trend.component';
import { DistractionComponent } from './pages/distraction/distraction.component';
import { CorrelationComponent } from './pages/correlation/correlation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FrequencyComponent,
    TrendComponent,
    DistractionComponent,
    CorrelationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
