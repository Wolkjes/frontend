import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { LoginComponent } from './login/login.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';

const routes: Routes = [
  { path: 'singleSensor', component: SingleSensorComponent},
  { path: 'campus/:id', component: CampusComponent},
  { path: 'users', component: UsersDashboardComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
