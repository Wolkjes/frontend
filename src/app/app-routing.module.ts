import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { VentilationControlComponent } from './ventilation-control/ventilation-control.component';
import { AuthAdminGuard } from './_guards/auth-admin-guard';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: 'singleSensor/:sensor_id', canActivate: [AuthGuard], component: SingleSensorComponent},
  { path: 'campus', canActivate: [AuthGuard], component: CampusComponent},
  { path: 'users', canActivate: [AuthAdminGuard], component: UsersDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'ventilation', canActivate: [AuthAdminGuard], component: VentilationControlComponent},
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: CampusComponent},
  {path: '**', canActivate: [AuthGuard], component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
