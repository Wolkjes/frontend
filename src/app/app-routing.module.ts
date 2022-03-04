import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { VentilationControlComponent } from './ventilation-control/ventilation-control.component';

const routes: Routes = [
  { path: 'singleSensor/:sensor_id', component: SingleSensorComponent},
  { path: 'campus', component: CampusComponent},
  { path: 'users', component: UsersDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'ventilation', component: VentilationControlComponent},
  { path: '', redirectTo: '/campus', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
