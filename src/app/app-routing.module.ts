import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';

const routes: Routes = [
  { path: 'singleSensor', component: SingleSensorComponent},
  { path: 'campus', component: CampusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
