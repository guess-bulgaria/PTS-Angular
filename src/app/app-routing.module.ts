import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { FrequencyComponent } from "./pages/frequency/frequency.component";
import { TrendComponent } from "./pages/trend/trend.component";
import { DistractionComponent } from "./pages/distraction/distraction.component";
import { CorrelationComponent } from "./pages/correlation/correlation.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'frequency', component: FrequencyComponent, pathMatch: 'full'},
      {path: 'trend', component: TrendComponent, pathMatch: 'full'},
      {path: 'distraction', component: DistractionComponent, pathMatch: 'full'},
      {path: 'correlation', component: CorrelationComponent, pathMatch: 'full'},
    ]),
  ],
})
export class AppRoutingModule {
}
